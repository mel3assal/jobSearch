import { Router } from "express";
import * as cc from './company.controller.js'
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from './../../validate.js';
import { addCompanyVal, deleteCompanyVal, getApplicationsVal, getCompanyVal, searchCompVal, updateCompanyVal } from "./company.validation.js";
const companyRouter=Router()
companyRouter.use(verifyToken)
companyRouter.post('/',validate(addCompanyVal),cc.addCompany).put('/:id',validate(updateCompanyVal),cc.updateCompany).get('/getCompany/:id',validate(getCompanyVal),cc.getCompanyData).
get('/',validate(searchCompVal),cc.searchForCompanyByName).delete('/:id',validate(deleteCompanyVal),cc.deleteCompany).get('/getApplications/:id',validate(getApplicationsVal),cc.getApplicationforSpecificJob)
export default companyRouter