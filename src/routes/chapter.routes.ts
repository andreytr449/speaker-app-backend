import {Router} from 'express';
import {CreateChapter, getChapters} from "../controllers/chapter.controller";
import {isAdmin} from "../middlewares/is-admin.middleware";
import {auth} from "../middlewares/auth.middleware";

const ChapterRouter = Router()

// PATH: api/v1/chapter/ [POST]
ChapterRouter.post('/', auth, isAdmin, CreateChapter)

// PATH: api/v1/chapter/ [GET]
ChapterRouter.get('/', auth, getChapters)

export default ChapterRouter;