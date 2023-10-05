import {Router} from 'express'
import express from 'express'
import { login, register, refreshToken, logout } from '../controllers/auth.controller.js';
import { infoUser } from '../controllers/auth.controller.js';
import { requiretoken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';


const router = express.Router()

router.post("/register", bodyRegisterValidator,register);

router.post("/login", bodyLoginValidator, login);

router.get('/protected', requiretoken, infoUser )
router.get('/refresh', requireRefreshToken ,refreshToken)
router.get('/logout', logout);
export default router;