
//No funciona desectructuración en mongoose
//import {Schema,model} from "mongoose";
import mongoose from "mongoose";
//encript or decrypt passwords
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email:  {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
        
    }
});

//capture data from schema
userSchema.pre("save",async function (next){
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        const salt = await bcryptjs.genSalt(10)
        console.log('-----------------')
        
        user.password = await bcryptjs.hash(user.password, salt)
        console.log('-----------------')
        
        next()
    } catch (error) {
        console.log(error)
        throw new Error('Falló el hash de contraseña')

    }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcryptjs.compare(candidatePassword,this.password)
}

export const User = mongoose.model('User', userSchema);