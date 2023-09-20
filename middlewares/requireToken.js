
import jwt from 'jsonwebtoken'

// export const requiretoken = (req,res,next) => {
//     try {
//         //  console.log(req.headers)
//         // let token = req.headers?.authorization;
//         let token = req.cookies.token;
//         if (!token) throw new Error("No existe el token en el header usa Bearer")
        
//         // token = token.split(" ")[1];

//         const {uid} = jwt.verify(token,process.env.JWT_SECRET)
//         req.uid = uid;

//         next(); 
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({error: error.message})
//     }
// }

// export const requiretokenRespaldo2 = (req,res,next) => {
//     try {
//         console.log(req.headers)
//         let token = req.cookies.token;
//         if (!token) throw new Error("No existe el token en el header usa Bearer")
        
//         // token = token.split(" ")[1]

//         const {uid} = jwt.verify(token,process.env.JWT_SECRET)
//         req.uid = uid;

//         next(); 
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({error: error.message})
//     }
// }

export const requiretoken = (req,res,next) => {
    try {
        console.log(req.headers)
        let token = req.headers?.authorization;
        if (!token) throw new Error("No existe el token en el header usa Bearer")
        
        token = token.split(" ")[1]

        const {uid} = jwt.verify(token,process.env.JWT_SECRET)
        req.uid = uid;

        next(); 
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: error.message})
    }
}