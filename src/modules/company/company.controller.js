import { Company } from './../../../database/models/company.model.js';
import { AppError } from '../../utilis/AppError.js';
import { catchError } from '../../middleware/catchError.js';
import { User } from '../../../database/models/user.model.js';
import { Application } from '../../../database/models/application.model.js';
import { Job } from '../../../database/models/job.model.js';


/*<-----------------add company----------->*/
const addCompany = catchError(async (req, res, next) => {
    const companyHR=req.body.companyHR
    const isFound=await Company.findOne({companyHR})
    if(isFound) return next(new AppError('company HR already exists ',401))
    if (req.user.userId != req.body.companyHR) return next(new AppError('you are not the HR for this company', 401))
    if (req.user.role != 'company-hr') return next(new AppError('you are not authorized to add Company', 401))
    const company = await Company.insertMany(req.body)
    res.status(200).json({ message: "company added successfully", company })
})

/*<-----------------delete company----------->*/

const deleteCompany = catchError(async (req, res, next) => {
    const company = await Company.findById(req.params.id)
    if(!company) return next(new AppError('company is not found',404))
    if (company.companyHR != req.user.userId) return next(new AppError('you are not the HR for this company', 401))
    await company.deleteOne()
    res.status(200).json({ message: "company deleted successfully", company })
})
/*<-----------------update company----------->*/

const updateCompany = catchError(async (req, res, next) => {
    const company = await Company.findById(req.params.id)
    if(!company) return next(new AppError('company is not found',404))
    if (company.companyHR != req.user.userId) return next(new AppError('you are not the HR for this company', 401))
    await company.updateOne(req.body)
    res.status(200).json({ message: "company updated successfully", company })
})
/*<-----------------get  company data ----------->*/

const getCompanyData = catchError(async (req, res, next) => {
    const company = await Company.findById(req.params.id)
    if(!company) return next(new AppError('company not found',404))
    if (company.companyHR != req.user.userId) return next(new AppError('you are not the HR for this company', 401))
    const jobs=await Job.find({addedBy:company.companyHR})
    res.status(200).json({company,jobs})
})
/*<-----------------search for  company by name ----------->*/

const searchForCompanyByName = catchError(async (req, res, next) => {
    const { companyName } = req.body
    const company = await Company.findOne({ companyName }, '-_id -companyHR')
    if (!company) return next(new AppError('company not found', 401))
    res.json({ message: "company details ", company })
})
/*<-----------------get all applications for  specific job ----------->*/

const getApplicationforSpecificJob = catchError(async (req, res, next) => {
    const job=await Job.findById({_id:req.params.id})
    if(!job) return next(new AppError('this job is not found ',404))
    if (req.user.role != 'company-hr') return next(new AppError('you are not authorized to get the Applications', 401))
    if(req.user.userId!=job.addedBy) return next(new AppError('you are not authorized to get the data for that job',401))
    const applications=await Application.find({jobId:job._id}).populate('userId','-password')
    res.json({message:"applicationts",applications})
})
    
export { addCompany, updateCompany, deleteCompany, getCompanyData, searchForCompanyByName ,getApplicationforSpecificJob}