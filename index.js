import 'dotenv/config'
import "./database/connectdb.js"
import express from "express"
import authRouter from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import linkRouter from "./routes/link.route.js";


// app.get("/login",(req,res) => {
//     res.json({ok:true})
// })
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/links',linkRouter);
//solo para el ejemplo de login y token
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log("prueba http://localhost:" + PORT));


