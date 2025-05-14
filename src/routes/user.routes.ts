import {Router} from "express";
import {auth} from "../middlewares/auth.middleware";
import {getUserData} from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/', auth, getUserData)

export default userRouter