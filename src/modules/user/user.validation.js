import joi from 'joi'
const signUpVal=joi.object({
    firstName:joi.string().min(3).max(20).required(),
    lastName:joi.string().min(3).max(20).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    repassword:joi.valid(joi.ref('password')).required(),
    recoveryEmail:joi.string().email().required(),
    DOB:joi.string(),
    mobileNumber:joi.string().pattern(/^01[0125][0-9]{8}$/),
    role:joi.string().pattern(/^(user|company-hr)$/).required()
})
const signInVal=joi.object({
    email:joi.string().email().required(),
    password:joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    recoveryEmail:joi.string().email(),
    mobileNumber:joi.string().pattern(/^01[0125][0-9]{8}$/),
})
const updateVal=joi.object({
    id:joi.string().hex().length(24),
    email:joi.string().email(),
    recoveryEmail:joi.string().email(),
    mobileNumber:joi.string().pattern(/^01[0125][0-9]{8}$/),
    DOB:joi.string(),
    firstName:joi.string().min(3).max(20),
    lastName:joi.string().min(3).max(20)
})
const deleteVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const getVal=joi.object({
    id:joi.string().hex().length(24).required()
})

const getotherUserVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const updatePasswordVal=joi.object({
    id:joi.string().hex().length(24).required(),
    password:joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    repassword:joi.valid(joi.ref('password')).required(),
})

const forgetPassword=joi.object({
    id:joi.string().hex().length(24).required(),
    email:joi.string().email().required(),
    newPassword:joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    repassword:joi.valid(joi.ref('newPassword')).required(),
})

const getUsersWithRecoveryEmail=joi.object({
    recoveryEmail:joi.string().email().required(),
})
export {signUpVal,signInVal,updateVal,deleteVal,getVal,getotherUserVal,updatePasswordVal,forgetPassword,getUsersWithRecoveryEmail}