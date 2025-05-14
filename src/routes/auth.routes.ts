import {Router} from "express";
import {
    signIn,
    signUp,
    verifyUser,
    checkEmail
} from "../controllers/auth.controller";
import {auth} from "../middlewares/auth.middleware";

const authRouter = Router();

// PATH: api/v1/auth/sign-in [POST]
authRouter.post('/sign-in', signIn)

// PATH: api/v1/auth/sign-up [POST]
authRouter.post('/sign-up', signUp)

// PATH: api/v1/auth/verify [POST]
authRouter.post('/verify', auth, verifyUser)

// PATH: api/v1/auth/check-email [POST]
authRouter.post('/check-email', checkEmail)

export default authRouter;