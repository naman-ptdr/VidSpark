// require('dotenv').config()
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// As early as possible in your application , iport and configure configDotenv;


dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at Port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo Db connection faild !!! ", err);
    
})











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