import { Application } from "../../../database/models/application.model.js"
import { Job } from "../../../database/models/job.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utilis/AppError.js"
/*<---------- apply for job-------->*/

const addApplication=catchError(async(req,res,next)=>{
    req.body.document = req.file.filename
    const jobId=req.body.jobId
    const job=await Job.findById({_id:jobId})
    if(!job) return next(new AppError('this is not valid job',404))
    if (req.user.role == 'company-hr') return next(new AppError('you are not a user you can not apply for that job', 401))
    if(req.body.userId!=req.user.userId) return next (new AppError('please enter your correct id',404))
    const application=await Application.insertMany(req.body)
    res.json({message:"application added successfully",application})
})

export{addApplication
}