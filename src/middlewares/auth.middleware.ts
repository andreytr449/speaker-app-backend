import jwt, {JwtPayload} from 'jsonwebtoken';
import {User} from "../models/user.model";
import {JWT_SECRET} from "../config/env";

export const auth = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded !== 'object' || !('userId' in decoded)) {
            return res.status(401).send({
                success: false,
                message: 'Invalid token payload'
            });
        }

        const userId = (decoded as JwtPayload).userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized'
            });
        }
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({
            success: false,
            message: 'Unauthorized',
            error: e.message
        });
    }
};
