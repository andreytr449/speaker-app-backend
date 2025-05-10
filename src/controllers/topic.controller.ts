import {HttpError} from "../utils/error-type";
import {Topic} from "../models/topic.model";

export const GetAllTopics = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const topics = await Topic.find()
            .skip(skip)
            .limit(limit)
            .sort({order: 1});

        const total = await Topic.countDocuments();

        return res.status(200).send({
            success: true,
            data: topics,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (e) {
        next(e);
    }
}

export const createTopic = async (req, res, next) => {
    try {
        const {
            chapterId,
            title,
            description,
            durationMinutes,
            order,
            imgUri
        } = req.body || {}
        if (!chapterId || !imgUri || !title || !description || !durationMinutes || !order) {
            return next(new HttpError('Enter correct data', 400));
        }
        const isTopicExist = await Topic.findOne({chapterId})
        if (isTopicExist) {
            if (isTopicExist.order === order) {
                return next(new HttpError('This chapter order is already exist', 400));
            }
        }
        const topic = await Topic.create({
            chapterId,
            title,
            description,
            durationMinutes,
            imgUri,
            order
        })
        res.status(201).send({success: true, data: topic})
    } catch (e) {
        next(e);
    }
}