import mongoose from "mongoose";
const clientes = new mongoose.Schema(
    {
        cedula:{type:String, required: true,unique:true,minlength:7,maxlength:10},
        nombre:{type:String, required: true,minlength:5},
        apellido:{type:String, required:true,minlength:8},
        edad:{type:Number},
        telefono:{type:Number, required:true,minlength:10},
        email:{type:String, required:true},
        contrasena:{type:String, required:true,minlength:8},
        maleta:{type:Number, required:true,maxlength:3},
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1}
    })

    export default mongoose.model("Cliente", clientes)
  