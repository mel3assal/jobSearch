import { Company } from "../../../database/models/company.model.js"
import { Job } from "../../../database/models/job.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utilis/AppError.js"
/*<-----------add Job----------->*/
const addJob = catchError(async (req, res, next) => {
    if (req.user.userId != req.body.addedBy) return next(new AppError('you are not the HR for this company', 401))
    if (req.user.role != 'company-hr') return next(new AppError('you are not authorized to add job', 401))
    const job = await Job.insertMany(req.body)
    res.status(200).json({ message: "job added successfully", job })
})
/*<-----------update Job----------->*/

const updateJob = catchError(async (req, res, next) => {
    const job = await Job.findById(req.params.id)
    if (req.user.userId != job.addedBy) return next(new AppError('you are not the HR for this company', 401))
    if (req.user.role != 'company-hr') return next(new AppError('you are not authorized to delete job', 401))
    await job.updateOne(req.body)
    res.status(200).json({ message: "job updated successfully", job })

})
/*<-----------delete Job----------->*/

const deleteJob = catchError(async (req, res, next) => {
    const job = await Job.findById(req.params.id)
    if (req.user.userId != job.addedBy) return next(new AppError('you are not the HR for this company', 401))
    if (req.user.role != 'company-hr') return next(new AppError('you are not authorized to add job', 401))
    await job.deleteOne()
    res.status(200).json({ message: "job deleted successfully", job })

})
/*<-----------get All jobs with  companyy details ----------->*/

const getJobsWithCompInfo=catchError(async(req,res,next)=>{
    const jobs=await Job.find({},'-_id')
    let companyHR=jobs.map((hr)=>hr.addedBy)
    let companies=[]
    for(let i=0;i<companyHR.length;i++){
        companies.push(await Company.findOne({companyHR:companyHR[i]}))
    }
    let result =[]
    result=[...jobs,...companies]
    res.json({message:"jobs ",result})
})
/*<-----------Get all Jobs for a specific company. ----------->*/

const getJobsForAcompany=catchError(async(req,res,next)=>{
    const companyName=req.body.companyName
    const company=await Company.findOne({companyName})
    if(!company) return next(new AppError('company not found ',404))
    const jobs=await Job.find({addedBy:company.companyHR})
    res.json({message:"jobs ",jobs})
})
/*<-----------Get all Jobs that match the following filters ----------->*/

const getJobsWithFilter=catchError(async(req,res,next)=>{
    const {workingTime,jobTitle,seniorityLevel,technicalSkills,jobLocation}=req.body
    const jobs=await Job.find({$or:[{workingTime},{jobTitle},{seniorityLevel},{technicalSkills},{jobLocation}]})
    if(!jobs) return next(new AppError('no jobs match that filte',404))
    res.json({message:"jobs are ",jobs})

})

export { addJob, updateJob,deleteJob,getJobsWithCompInfo,getJobsForAcompany,getJobsWithFilter}