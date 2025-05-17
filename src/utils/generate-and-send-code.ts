import {Code} from "../models/code.model";
import {sendEmail} from "./send-email";
import mongoose from "mongoose";


export const GenerateAndSendCode = async (userId: mongoose.Types.ObjectId, userEmail: string, userName: string) => {
    const code = Math.floor(1000 + Math.random() * 9000);
    await Code.create({userId, code})
    await sendEmail({
        to: userEmail,
        type: 'Registration Code',
        userName: userName,
        code
    });
}