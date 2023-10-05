import { validationResult } from "express-validator";
import {User} from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateRefreshToken, generateToken } from "../helpers/utils/tokenManager.js";

export const register = async(req,res) => {
    
    console.log(req.body)
    const {email,password} = req.body;
    try{
        // buscar el usuario antes de guardar alternativa por email
        let user = await User.findOne({email})
       
        if (user) throw ({code: 11000}) // el throw salta al catch

        user = new User({email,password});
        await user.save()

        //jwt token
        const {token, expiresIn} = generateToken(user.id);
        console.log(user.id)
        
        
        generateRefreshToken(user.id,res);

        return res.status(201).json({token, expiresIn})

    } catch (error){
        if (error.code === 11000)
        {
            //alternativa por defecto mongoose
            return res.status(400).json({error: "Ya existe este usuario"})
        }
        return res.status(500).json({error: "Error de servidor"})
    }
    // res.json({ok:"Register"});
}

export const login = async(req,res) => {

    try {
        const {email,password} = req.body;
        let user = await User.findOne({email})
        if (!user) return res.status(403).json({error: "No existe este usuario"})

        
        const respuestaPassword = await user.comparePassword(password)
        
        if (!respuestaPassword)
        {
            return res.status(405).json({error: "Contraseña incorrecta"})
        }


        //Generar el token jason web tocken JWT, en vez de "Login" debemos de enviar token de seguridad
        
        const {token, expiresIn} = generateToken(user.id);
        console.log(user.id)
        
        
        generateRefreshToken(user.id,res);
        //const token = jwt.sign({uid: user.id},process.env.JWT_SECRET)

        // Trabajar con cookies
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: !(process.env.MODO === "developer")
        // })

        

        //res.json({token});
        return res.json({token, expiresIn})
    } catch (error) {
        return res.status(500).json({error: "Error de servidor"}) 
    }


    
}

export const infoUser = async (req,res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({email: user.email, uid: user._id});
    } catch (error){
        return res.status(500).json({error:"error de server"})
    }
   
};

export const refreshToken = (req,res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el token en el header usa Bearer")
        
        const {uid} = jwt.verify(refreshTokenCookie,process.env.JWT_REFRESH);
        const {token, expiresIn} = generateToken(req.uid);
        return res.json({token, expiresIn})

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"error de server"})
    }
    
    

};

export const logout = (req,res) => {
    res.clearCookie('refreshToken')
    res.json({ok:true})
};