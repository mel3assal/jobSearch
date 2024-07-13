import { Router } from "express";
import * as jc from './job.controller.js'
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../validate.js";
import { addJobVal, deleteJobVal, getJobsOfCompanyVal, getJobsWithCompInfoVal, getJobsWithFilterVal, updateJobVal } from "./job.validation.js";
const jobRouter=Router()
jobRouter.use(verifyToken)
jobRouter.post('/',validate(addJobVal),jc.addJob).put('/:id',validate(updateJobVal),jc.updateJob).delete('/:id',validate(deleteJobVal),jc.deleteJob).
get('/',validate(getJobsWithCompInfoVal),jc.getJobsWithCompInfo).get('/jobs',validate(getJobsOfCompanyVal),jc.getJobsForAcompany).
get('/filterjobs',validate(getJobsWithFilterVal),jc.getJobsWithFilter)

export default jobRouter