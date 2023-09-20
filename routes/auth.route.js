import {Router} from 'express'
import express from 'express'
import { login, register, refreshToken, logout } from '../controllers/auth.controller.js';
import { body } from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { infoUser } from '../controllers/auth.controller.js';
import { requiretoken } from '../middlewares/requireToken.js';


const router = express.Router()

router.post(
    "/register",
    [
        body('email',"Formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password','formato de password incorrecto')
            .trim()
            .isLength({min:6})
            .custom((value,{req}) => {
                if(value!=req.body.repassword){
                    throw new Error('No coinciden las contraseñas')
                }
                return value;
            })
    ],
    validationResultExpress,
    register
);

router.post(
    "/login",
    [
        body('email',"Formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password','formato de password incorrecto')
    ],
    validationResultExpress,
    login
);

router.get('/protected', requiretoken, infoUser )
router.get('/refresh', refreshToken)
router.get('/logout', logout);
export default router;