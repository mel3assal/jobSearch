import { model, Schema } from "mongoose";
const schema = new Schema({
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    userName:{
        type: String,
      },
    email: { type: String, required: true, unique: true },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    password: String,
    recoveryEmail: String,
    DOB: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value instanceof Date && value <= new Date(), // Ensure valid date format and prevent future dates
            message: (props) => `${props.value} is not a valid date in YYYY-MM-DD format, or is a future date.`,
        }
    },
    mobileNumber: { type: String, required:true,unique: true },
    role: { type: String, required: true, enum: ['user', 'company-hr'] },
    status: { type: String, enum: ['online', 'offline'] },
    otp:String,
    otpExpiry:Date

}, { timestamps: true })
export const User=model('User',schema)