import joi from 'joi'
/*<--------- add company validation------->*/

const addCompanyVal=joi.object({
   companyName:joi.string().required(),
   description:joi.string(),
   industry:joi.string(),
   address:joi.string(),
   numberOfEmployees:joi.string(),
   companyEmail:joi.string().email().required(),
   companyHR:joi.string().hex().length(24).required()
})

/*<--------- update company validation------->*/

const updateCompanyVal=joi.object({
   id:joi.string().hex().length(24).required(),
   companyName:joi.string(),
   description:joi.string(),
   industry:joi.string(),
   address:joi.string(),
   numberOfEmployees:joi.string(),
   companyEmail:joi.string().email(),
   companyHR:joi.string().hex().length(24)
})

/*<--------- get company validation------->*/

const getCompanyVal=joi.object({
   id:joi.string().hex().length(24).required(),
 
})
/*<--------- search for  company validation------->*/

const searchCompVal=joi.object({
   companyName:joi.string().required()
})
/*<--------- delete   company validation------->*/

const deleteCompanyVal=joi.object({
   id:joi.string().hex().length(24).required(),
})
/*<--------- get application for specific job validation------->*/

const getApplicationsVal=joi.object({
   id:joi.string().hex().length(24).required()
})
export {addCompanyVal,updateCompanyVal,getCompanyVal,searchCompVal,deleteCompanyVal,getApplicationsVal}