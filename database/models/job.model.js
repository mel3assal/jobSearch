import { model, Schema, Types } from "mongoose";

const schema=new Schema({
    jobTitle:String,
    jobLocation:{type:String,enum:['onsite','remotely','hybrid']},
    workingTime:{type:String,enum:['part-time','full-time']},
    seniorityLevel:{type:String,enum:['junior','Mid-Level','senior','Team-Lead','CTO']},
    jobDescription:String,
    technicalSkills:[String],
    softSkills:[String],
    addedBy:{type:Types.ObjectId,ref:'User'}
},{timestamps:true})

export const Job=model('Job',schema)