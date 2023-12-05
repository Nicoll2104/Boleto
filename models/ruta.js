import mongoose from "mongoose";
const ruta = new mongoose.Schema(
    {
        origen:{type: String, required: true},
        destino:{type:String, required: true},
        horarios:{type: String, required: true},
        distancia:{type:String, required: true},
        duracion:{type: String, required: true},
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1} 
    })

    export default mongoose.model("Ruta", ruta)