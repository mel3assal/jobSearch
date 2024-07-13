process.on('uncaughtException',(err)=>{
    console.log("error",err)
})
import dotenv from 'dotenv'
dotenv.config({path:'./env'})
process.env
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import  bootstrap  from './bootstrap.js';
const app = express()
app.use(express.json())
bootstrap(app,express)
const port =process.env.port || 3000
app.listen(port, () => console.log(`app listening on port ${port}!`))
process.on('unhandledRejection',(err)=>{
    console.log("error",err)
})