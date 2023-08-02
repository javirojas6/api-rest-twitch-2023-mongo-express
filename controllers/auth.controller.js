import { validationResult } from "express-validator";
import {User} from '../models/User.js';
import jwt from 'jsonwebtoken';

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


        return res.status(201).json({ok:true})

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
        const token = jwt.sign({uid: user.id},process.env.JWT_SECRET)


        res.json({token});
    } catch (error) {
        return res.status(500).json({error: "Error de servidor"}) 
    }


    
}

