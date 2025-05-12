import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import {HttpError} from "../utils/error-type";
import {User} from "../models/user.model";
import {JWT_SECRET} from "../config/env";
import {Code} from "../models/code.model";
import {AuthenticatedRequest} from "../../types/express";
import {GenerateAndSendCode} from "../utils/generate-and-send-code";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password, name} = req.body || {};
        if (!email || !password || !name || !name.trim()) {
            return next(new HttpError('Enter correct data', 400));
        }
        if (password.length < 6) {
            return next(new HttpError('Enter stronger password', 400));
        }
        const isUserExist = await User.findOne({email})
        if (isUserExist) {
            return next(new HttpError('Something went wrong', 400));
        }
        const hashPassword = await bcrypt.hash(password, 8);
        const user = await User.create({name, email, password: hashPassword});
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '7d'});
        await GenerateAndSendCode(user._id, user.email, user.name)
        res.status(200).json({success: true, data: {token, user}});
    } catch (e) {
        next(e);
    }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body || {};
        if (!email || !password) {
            return next(new HttpError('Enter correct data', 400));
        }
        if (password.length < 6) {
            return next(new HttpError('Enter stronger password', 400));
        }
        const user = await User.findOne({email})
        if (!user) {
            return next(new HttpError('Something went wrong', 400));
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return next(new HttpError('Something went wrong', 400));
        }
        const token = jwt.sign(
            {userId: user._id},
            JWT_SECRET,
            {expiresIn: '7d'}
        );

        if (!user.isVerified) {
            const userCode = await Code.findOne({userId: user._id})
            if (!userCode) {
                await GenerateAndSendCode(user._id, user.email, user.name)
            }
        }

        res.status(200).json({success: true, data: {token, user}});
    } catch (e) {
        next(e);
    }
}

export const verifyUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (req.user.isVerified) {
            res.status(200).send({success: true})
            return
        }
        const {code: reqCode} = req.body || {};
        if (!reqCode) {
            res.status(400).send({
                success: false,
                message: 'Verification code is required.'
            });
            return
        }
        const userCode = await Code.findOne({userId: req.user._id})

        if (!userCode) {
            await GenerateAndSendCode(req.user._id, req.user.email, req.user.name)
            return next(new HttpError('Your verification code has expired. A new code has been sent to your email.', 410));
        }
        const code = Number(reqCode);
        if (code !== userCode.code) {
            return next(new HttpError('Incorrect verification code.', 401));
        }
        await User.findByIdAndUpdate(req.user._id, {isVerified: true})
        await Code.deleteOne({userId: req.user._id});
        res.status(200).send({success: true})
    } catch (e) {
        next(e);
    }
}

export const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email} = req.body || {};
        if (!email)
            return next(new HttpError('Enter correct data', 400));

        const user = await User.findOne({email})
        res.status(200).send({success: true, isUserExist: !!user})
    } catch (e) {
        next(e);
    }
}