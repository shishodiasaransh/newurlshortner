import express from "express"
import mogoose from "mongoose"
import { analyticsHandler, posthandle, redir, urlgenerate } from "../controllers/controllers.js"

const router = express.Router()

router.post('/url',posthandle)
router.get("/",urlgenerate)
router.get('/:sid',redir)
router.get("/analytics/:sid",analyticsHandler)

export default router