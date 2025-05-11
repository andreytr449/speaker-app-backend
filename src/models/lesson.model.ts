import mongoose, { Schema, Document, Types } from 'mongoose';

interface Variant {
    question: string;
    correct: boolean;
}

interface Sentence {
    type: 'sentence';
    textData: string;
    variants: Variant[];
}

interface Video {
    type: 'video';
    videoUri: string;
}

type LessonDataItem = Sentence | Video;

interface LessonBlock {
    title: string;
    isQuestion: boolean;
    correctText?: string;
    wrongText?: string;
    lessonData: LessonDataItem[];
}

interface Lesson extends Document {
    lessonId: string;
    lessonData: LessonBlock[];
}

const VariantSchema = new Schema<Variant>({
    question: { type: String, required: true },
    correct: { type: Boolean, required: true }
});

const SentenceSchema = new Schema<Sentence>({
    type: { type: String, enum: ['sentence'], required: true },
    textData: { type: String, required: true },
    variants: [VariantSchema]
}, { _id: false });

const VideoSchema = new Schema<Video>({
    type: { type: String, enum: ['video'], required: true },
    videoUri: { type: String, required: true }
}, { _id: false });

// Union schema — can be either sentence or video
const LessonDataItemSchema = new Schema<LessonDataItem>({
    type: { type: String, required: true },
    textData: { type: String },
    videoUri: { type: String },
    variants: [VariantSchema]
}, { _id: false });

const LessonBlockSchema = new Schema<LessonBlock>({
    title: { type: String, required: true },
    isQuestion: { type: Boolean, required: true },
    correctText: { type: String },
    wrongText: { type: String },
    lessonData: [LessonDataItemSchema]
}, { _id: false });

const LessonSchema = new Schema<Lesson>({
    lessonId: { type: String, required: true },
    lessonData: [LessonBlockSchema]
});

export const LessonModel = mongoose.model<Lesson>('Lesson', LessonSchema);
