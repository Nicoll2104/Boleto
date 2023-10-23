import mongoose from "mongoose";
const vendedor = new mongoose.Schema(
    {
        cedula:{type:String, required: true,unique:true,minlength:7,maxlength:10},
        nombre: {type: String, require:true},
        apellido: {type:String, require: true},
        telefono:{type:String, required:true,minlength:10, maxlength:10},
        usuario: {type:String, require:true,minlength:5},
        contrasena: {type:String, require:true,minlength:8},
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1},
    })
    
    export default mongoose.model("Vendedor", vendedor)