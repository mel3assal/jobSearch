import jwt from 'jsonwebtoken'
import { AppError } from '../utilis/AppError.js'
export const verifyToken = async (req, res, next) => {
    let { token } = req.headers
    jwt.verify(token, 'mynameIsMohamed', async (err, decode) => {
    if (err) return next(new AppError('invalid token ',401))
    req.user=decode
    })
    next()
}
