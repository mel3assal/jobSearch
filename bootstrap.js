import userRouter from "./src/modules/user/user.routes.js"
import { globalError } from './src/middleware/globalError.js';
import { AppError } from "./src/utilis/AppError.js";
import companyRouter from "./src/modules/company/company.routes.js";
import jobRouter from "./src/modules/jobs/job.routes.js";
import applicationRouter from "./src/modules/application/application.routes.js";
const bootstrap=(app,express)=>{
    app.use('/user',userRouter)
    app.use('/company',companyRouter)
    app.use('/job',jobRouter)
    app.use('/application',applicationRouter)
    app.use('/uploads',express.static('uploads'))
    app.use('*',(req,res,next)=>{
        next(new AppError(`routes not found ${req.originalUrl}`,404))
    })
    app.use(globalError)
}
export default bootstrap