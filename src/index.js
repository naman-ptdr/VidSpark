import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express"

( async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("ERROR : ", error);
        throw error
    }
})()