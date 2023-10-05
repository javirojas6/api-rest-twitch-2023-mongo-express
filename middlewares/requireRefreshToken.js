import jwt from 'jsonwebtoken';
import { tokenVerificationErrors } from "../helpers/utils/tokenManager.js";


export const requireRefreshToken = (req,res,next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el token en el header usa Bearer")
        
        const {uid} = jwt.verify(refreshTokenCookie,process.env.JWT_REFRESH);
        req.uid = uid
        next()
    } catch (error) {
        res.status(401).json({error: tokenVerificationErrors[error.message]})   
    }
};