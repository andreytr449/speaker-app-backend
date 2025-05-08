import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: Number, required: true },
    type: { type: String, enum: ['registration', 'password_reset'], default: 'registration' },
    createdAt: { type: Date, default: Date.now, expires: 400 }
});

export const Code = mongoose.model('Code', codeSchema);
