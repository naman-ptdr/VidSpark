// require('dotenv').config()
import dotenv from "dotenv";
import connectDB from "./db/index.js";


// As early as possible in your application , iport and configure configDotenv;


dotenv.config({
    path: './env'
})


connectDB();











// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

// import express from "express"

// ( async () => {
//     try {
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     } catch (error) {
//         console.log("ERROR : ", error);
//         throw error
//     }
// })()