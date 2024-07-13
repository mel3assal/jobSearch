const applicationVal=joi.object({
    jobId:joi.string().hex().length(24).required(),
    userId:joi.string().hex().length(24).required(),
    userTechSkills:joi.string(),
    userSoftSkills:joi.string(),
    document:joi.string()
 })
 export{applicationVal}