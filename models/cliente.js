import mongoose from "mongoose";
const clientes = new mongoose.Schema(
    {
        cedula:{type:String, required: true,unique:true,minlength:7,maxlength:10},
        nombre:{type:String, required: true},
        telefono:{type:String, required:true,minlength:10, maxlength:10},
        email:{type:String, required:true},
        contrasena:{type:String, required:true,minlength:8},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Cliente", clientes)
  