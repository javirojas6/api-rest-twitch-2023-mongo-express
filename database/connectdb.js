
import mongoose from "mongoose";

try {
    console.log(process.env.URI_MONGO)
    await mongoose.connect(process.env.URI_MONGO)
    console.log('connect DB ok')
} catch(error) {
    console.log("Error de conexión a mongodb: " + error)
}
