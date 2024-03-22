import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId} = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, recieverId] },
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId],
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message,
        })

        if(newMessage) {
            conversation.message.push(newMessage._id);
        }

        // await conversation.save(); 
        // await newMessage.save();

        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //SOCKET IO FUNCTION WILL GO HERE 
        const receiverSocketId = getReceiverSocketId(recieverId);
        if(receiverSocketId) {
            //io.to (<socket_id>.emit() used tp send events to specific client 
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error:"Internal server errror"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id;  

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("message"); // NO REFERENCE BUT ACTUAL MESSAGES
        
        if(!conversation) return res.status(200).json([]);

        const message = conversation.message

        res.status(200).json(conversation.message)
    }
    catch(error) {
        console.log("Error in getMessage controller: ", error.message)
        res.status(500).json({error:"Internal server errror"})
    }
}