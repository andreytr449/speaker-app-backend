import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Title is required'] },
    order: { type: Number, required: [true, 'Order is required'] },
}, {timestamps: true});

export const Chapter = mongoose.model('Chapter', chapterSchema);