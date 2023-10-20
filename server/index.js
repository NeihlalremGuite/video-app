import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

let cors = require("cors");

const app = express();
app.use(cors());


dotenv.config();
const connect = ()  => {
    mongoose
        // We use env file to store the DB key as we don't want to made it available public
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connect to DB");
        })
        .catch((err) => {
            throw err;
        });
};

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req, res, next)=> {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.listen(8800, () => {
    connect();
    console.log("Connected to SERVER");
})