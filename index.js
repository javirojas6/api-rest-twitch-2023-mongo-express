import 'dotenv/config'
import "./database/connectdb.js"
import express from "express"
import authRouter from './routes/auth.route.js'




// app.get("/login",(req,res) => {
//     res.json({ok:true})
// })
const app = express();
app.use(express.json());
app.use('/api/v1',authRouter);

const PORT = process.env.PORT || 5000;


  app.listen(PORT, () => console.log("prueba http://localhost:" + PORT));

  console.log('hola')

