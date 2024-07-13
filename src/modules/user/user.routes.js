import { Router } from "express";
import * as uc from './user.controller.js'
import checkEmail from './../../middleware/checkEmail.js';
import {verifyToken}  from './../../middleware/verifyToken.js';
import { validate } from './../../validate.js';
import {  deleteVal, forgetPassword, getotherUserVal, getUsersWithRecoveryEmail, getVal, signInVal, signUpVal, updatePasswordVal, updateVal } from "./user.validation.js";
const userRouter=Router()
userRouter.post('/signUp',validate(signUpVal),checkEmail,uc.signUp).post('/signIn',validate(signInVal),uc.signIn).put('/:id',validate(updateVal),verifyToken,uc.updateAccount).
delete('/:id',validate(deleteVal),verifyToken,uc.deleteAccount).get('/verify/:token',verifyToken,uc.confrimEmail).get('/getdetails/:id',validate(getVal),verifyToken,uc.getUserAccountData).
get('/user/:id',validate(getotherUserVal),uc.getDataForAnotherAccount).put('/updatePassword/:id',validate(updatePasswordVal),verifyToken,uc.updatePassword).put('/:id/forgetPassword',validate(forgetPassword),uc.changePassword).
get('/recoveryEmail',validate(getUsersWithRecoveryEmail),uc.getAccountWithRecEmail)
export default userRouter