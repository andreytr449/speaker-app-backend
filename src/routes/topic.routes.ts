import {Router} from "express";
import {auth} from "../middlewares/auth.middleware";
import {createTopic, GetAllTopics} from "../controllers/topic.controller";
import {isAdmin} from "../middlewares/is-admin.middleware";

const TopicRouters = Router()

// PATH: api/v1/topic/ [GET]
TopicRouters.get('/', auth, GetAllTopics)

// PATH: api/v1/topic/create [POST]
TopicRouters.post('/create', auth, isAdmin, createTopic)

export default TopicRouters;