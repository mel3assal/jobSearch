import { User } from "../../../database/models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { sendEmail } from './../../middleware/sendEmail.js';
import { catchError } from './../../middleware/catchError.js';
import { AppError } from "../../utilis/AppError.js";
/*<------------------sign Up------------>*/
const signUp=catchError(async(req,res)=>{
    req.body.userName=req.body.firstName+' '+req.body.lastName
    let user=await User.insertMany(req.body)
    sendEmail(req.body.email)
    user[0].password=undefined;
    res.status(201).json(user)
})

/*<------------------sign in------------>*/

const signIn=catchError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user|| !bcrypt.compareSync(req.body.password,user.password))
    return next(new AppError("invalid email or password",401))
    jwt.sign({userId:user._id,name:user.userName,role:user.role},'mynameIsMohamed',(err,token)=>{res.json({message:"success",token})})
    await user.updateOne({status:'online'})
})

/*<------------------update Account------------>*/

const updateAccount=catchError(async(req,res,next)=>{
    if(req.user.userId!=req.params.id) return next(new AppError('you are not authorized to update the account',401))
    const user=await User.findByIdAndUpdate({_id:req.user.userId},req.body,{new:true})
    res.json({message:"updated successfully",user})
})

/*<------------------delete Account------------>*/

const deleteAccount=catchError(async(req,res,next)=>{
    if(req.user.userId!=req.params.id)return next(new AppError('you are not authorized to delete the account ',401))
    const user=await User.findByIdAndDelete({_id:req.user.userId})
    res.json({message:"deleted successfully",user})
})
/*<------------------confirm  Email------------>*/

const confrimEmail=catchError(async(req,res,next)=>{
    jwt.verify(req.params.token,'MyNameIsMohamed',async(err,decode)=>{
        if(err) return next(AppError(err,404))
        const user=await User.findOneAndUpdate({email:decode.email},{confirmEmail:true},{new:true})
        res.json({message:"success",user})
    }) 
})

/*<------------------get User Account Data ------------>*/

const getUserAccountData=catchError(async(req,res,next)=>{
    if(req.user.userId!=req.params.id)return next(new AppError('you are not authorized to get the data ',401))
    const user=await User.findById(req.params.id)
    res.json({message:"user",user})
})

/*<------------------get profile  Data for another user ------------>*/

const getDataForAnotherAccount=catchError(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    user.password=undefined
    user.email=undefined
    res.json({message:"user",user})
})

/*<------------------update Password ------------>*/

const updatePassword=catchError(async(req,res,next)=>{
    if(req.user.userId!=req.params.id)return next(new AppError('you are not authorized to delete',401))
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    const user=await User.findByIdAndUpdate(req.params.id,req.body)
    res.json({message:"password updated successfully"})
})

/*<------------------change Password ------------>*/

const   changePassword=catchError(async(req,res,next)=>{
    const {email,newPassword}=req.body  //in postman email is undefined but i when i log it appears
    if(req.user.email!=email)return next(new AppError('you are not authorized to delete',401))
    const user=await User.findOne({email})
    if(!user) return next(new AppError('user not found',404))
    const otp=Math.random().toString(36).substring(2, 7).toUpperCase()
    const otpExpiry = Date.now() + (3 * 60 * 1000);
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    user.otp = undefined; // Clear OTP after successful verification
    user.otpExpiry = undefined; // Clear expiry time (optional)
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
})

/*<------------------get Account with  recovery Email ------------>*/

const getAccountWithRecEmail=catchError(async(req,res,next)=>{
    const {recoveryEmail}=req.body
    const users=await User.find({recoveryEmail:recoveryEmail})
    if(users.length==0) return next(new AppError('users with this recovery email not found',404))
    res.json({message:"users with recovery email",users})
})
export{
    signUp,signIn,confrimEmail,updateAccount,deleteAccount,getUserAccountData,getDataForAnotherAccount,
    updatePassword,changePassword,getAccountWithRecEmail
}