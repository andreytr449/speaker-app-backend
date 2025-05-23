import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    langFrom: { type: String },
    langTo: { type: String },
}, { _id: false });

const progressSchema = new mongoose.Schema({
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    completedAt: { type: Date, default: Date.now }
}, { _id: false });

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: { type: String, required: true, minLength: 6, maxLength: 255 },
    name: { type: String },
    isVerified: { type: Boolean, default: false },
    settings: settingsSchema,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    progress: [progressSchema]
}, {timestamps: true});

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});


export const User = mongoose.model('User', userSchema);