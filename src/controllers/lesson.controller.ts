import {LessonModel} from "../models/lesson.model";
import {HttpError} from "../utils/error-type";

export const createLesson = async (req, res, next) => {
    try {
        const {lessonId, lessonData} = req.body;

        if (!lessonId || !Array.isArray(lessonData)) {
            return next(new HttpError('Invalid lesson data format', 400));
        }

        const isLessonExist = await LessonModel.find({lessonId})
        if (isLessonExist)
            return next(new HttpError('Lesson on this topic already exist', 400));

        for (const block of lessonData) {
            if (
                typeof block.title !== 'string' ||
                typeof block.isQuestion !== 'boolean' ||
                !Array.isArray(block.lessonData)
            ) {
                return next(new HttpError('Invalid block format', 400));
            }

            for (const item of block.lessonData) {
                if (item.type === 'sentence') {
                    if (
                        typeof item.textData !== 'string' ||
                        !Array.isArray(item.variants) ||
                        !item.variants.every(
                            (v: any) =>
                                typeof v.question === 'string' && typeof v.correct === 'boolean'
                        )
                    ) {
                        return next(new HttpError('Invalid sentence item', 400));
                    }
                } else if (item.type === 'video') {
                    if (typeof item.videoUri !== 'string') {
                        return next(new HttpError('Invalid video item', 400));
                    }
                } else {
                    return next(new HttpError('Unknown lessonData type', 400));
                }
            }
        }

        const newLesson = new LessonModel({lessonId, lessonData});
        const saved = await newLesson.save();

        res.status(201).json(saved);
    } catch (e) {
        next(e)
    }
}

export const getLesson = async (req, res, next) => {
    try {
        const {lessonId} = req.params;
        if (!lessonId) {
            return next(new HttpError('Enter correct data', 400));
        }
        const lesson = await LessonModel.find({lessonId});
        res.status(200).send({success: true, data: lesson ? lesson : []})
    } catch (e) {
        next(e)
    }
}