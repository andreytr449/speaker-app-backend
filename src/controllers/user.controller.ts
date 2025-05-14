import {User} from "../models/user.model";

export const getUserData = async (req, res, next) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId);
        res.status(200).send({success: true, data: user});
    } catch (e) {
        next(e)
    }
}