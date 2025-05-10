import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true,
    },
    title: {type: String, required: true},
    description: {type: String},
    imgUri: {type: String, required: true},
    durationMinutes: {type: Number, required: true},
    order: {type: Number, required: true},
}, {timestamps: true});

export const Topic = mongoose.model('Topic', topicSchema);