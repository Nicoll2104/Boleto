import mongoose from "mongoose";
const vendedor = new mongoose.Schema(
    {
        nombre: {type: String, require:true},
        apellido: {type:String, require: true},
        cedula: {type:String, require:true},
        telefono: {type:String, require:true},
        usuario: {type:String, require:true},
        contrasena: {type:String, require:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1},
    })
    
    export default mongoose.model("Vendedor", vendedor)