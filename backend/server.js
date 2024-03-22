import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./route/auth.routes.js";
import connectToMongoDb from "./Database/connectToMongoDb.js";
import MessageRoutes from "./route/message.routes.js";
import userRoutes from "./route/user.routes.js";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", MessageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//     //root route http://localhost:5000
//     res.send("Hello World!!")
// });

server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server Running on port ${PORT}`)
});