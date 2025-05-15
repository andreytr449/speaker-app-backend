import {HttpError} from "../utils/error-type";
import {Chapter} from "../models/chapter.model";

export const CreateChapter = async (req, res, next) => {
    try {
        const {title, order} = req.body || {};
        if (!title || !order || order <= 0) {
            return next(new HttpError('Enter correct data', 400));
        }
        const isExistChapter = await Chapter.findOne({order})
        if (isExistChapter) {
            return next(new HttpError('This chapter order is already exist', 400));
        }
        const chapter = await Chapter.create({title, order})
        res.status(201).send({success: true, data: chapter})
    } catch (e) {
        next(e);
    }
}

export const getChapters = async (req, res, next) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const chapters = await Chapter.find()
            .skip(skip)
            .limit(limit)
            .sort({ order: 1 })
            .populate({
                path: 'topics',
                options: { sort: { order: 1 } }
            });


        const total = await Chapter.countDocuments();

        return res.status(200).send({
            success: true,
            data: chapters,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    }catch (e) {
        next(e);
    }
}