import mongoose from "mongoose";

const connectToMongoDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connect to MongoDB")
    }
    catch(error) {
        console.log("Error connection to MongoDb",error.message)
    }
};

export default connectToMongoDb;