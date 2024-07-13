import joi from 'joi'
const addJobVal=joi.object({
   jobTitle:joi.string().required(),
   jobLocation:joi.string().pattern(/^(onsite|remotely|hybrid)$/).required(),
   workingTime:joi.string().pattern(/^(part-time|full-time)$/).required(),
   seniorityLevel:joi.string().pattern(/^(junior|Mid-Level-senior|Team-Lead|CTO)$/).required(),
   jobDescription:joi.array(),
   technicalSkills:joi.array(),
   softSkill:joi.array(),
   addedBy:joi.string().hex().length(24).required()
})
const updateJobVal=joi.object({
    id:joi.string().hex().length(24).required(),
    jobTitle:joi.string(),
    jobLocation:joi.string().pattern(/^(onsite|remotely|hybrid)$/),
    workingTime:joi.string().pattern(/^(part-time|full-time)$/),
    seniorityLevel:joi.string().pattern(/^(junior|Mid-Level-senior|Team-Lead|CTO)$/),
    jobDescription:joi.array(),
    technicalSkills:joi.array(),
    softSkill:joi.array(),
 })
 const deleteJobVal=joi.object({
    id:joi.string().hex().length(24).required()
 })
 const getJobsWithCompInfoVal=joi.object({
   
 })
 const getJobsOfCompanyVal=joi.object({
   companyName:joi.string().required()
 })
 const getJobsWithFilterVal=joi.object({
    jobTitle:joi.string().required(),
    jobLocation:joi.string().pattern(/^(onsite|remotely|hybrid)$/),
    workingTime:joi.string().pattern(/^(part-time|full-time)$/),
    seniorityLevel:joi.string().pattern(/^(junior|Mid-Level-senior|Team-Lead|CTO)$/),
    technicalSkills:joi.array(),
 })
export{addJobVal,updateJobVal,deleteJobVal,getJobsWithCompInfoVal,getJobsOfCompanyVal,getJobsWithFilterVal}