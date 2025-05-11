import {Router} from "express";
import {auth} from "../middlewares/auth.middleware";
import {isAdmin} from "../middlewares/is-admin.middleware";
import {createLesson, getLesson} from "../controllers/lesson.controller";

const LessonRouter = Router();

// PATH: api/v1/lesson/ [POST]
LessonRouter.post('/', auth, isAdmin, createLesson)

// PATH: api/v1/lesson/ [GET]
LessonRouter.get('/:lessonId', auth, getLesson)

export default LessonRouter;