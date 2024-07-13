import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utilis/AppError.js';
const fileUpload=()=>{
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + "-" + file.originalname)
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimetype=='application/pdf') {
            cb(null, true)
        } else { 
            cb(new AppError('pdfs only ', 401), false)
        }
    }
    const  upload = multer({ storage,fileFilter })
    return upload
}
export const uploadSingleFile=(fieldName)=>fileUpload().single(fieldName)
export const uploadMixOfFiles=(arrayOfFields)=>fileUpload().fields(arrayOfFields)