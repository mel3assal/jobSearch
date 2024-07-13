import { Router } from "express";
import * as ac from './application.controller.js'
import { verifyToken } from "../../middleware/verifyToken.js";
import { uploadSingleFile } from "../../middleware/uploadFile.js";
const applicationRouter=Router()
applicationRouter.use(verifyToken)
applicationRouter.post('/',uploadSingleFile('document'),ac.addApplication)
export default applicationRouter