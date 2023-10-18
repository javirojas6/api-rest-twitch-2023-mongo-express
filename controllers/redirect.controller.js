import { Link } from "../models/Link.js";

export const redirectLink = async (req,res) => {
    try {
        const {nanoLink} = req.params;
        const link = await Link.findOne({nanoLink});
        console.log(link)
        if (!link) return res.status(404).json({error:"No existe el link"});
       
        return res.redirect(link.longLink);
       
    //    return res.status(201).json({links})
   } catch (error) {
        if (error.kind == "ObjectId") return res.status(403).json({error:"Formato Id Incorrecto"});
        console.log(error)
        return res.status(500).json({error:"error de servidor"})
       
   }
}