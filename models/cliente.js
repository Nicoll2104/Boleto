import mongoose from "mongoose";
const cliente = new mongoose.Schema(
    {
        cedula:{type:String, required: true,unique:true,minlength:7,maxlength:10},
        nombre:{type:String, required: true,minlength:8},
        apellido:{type:String, required:true,minlength:8},
        edad:{type:Boolean,default:false},
        telefono:{type:Number, required:true,minlength:10},
        email:{type:String, required:true},
        contraseña:{type:String, required:true,minlength:8},
        maleta:{type:Number, required:true,maxlength:3},
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1}
    })

    export default mongoose.model("Cliente", cliente)
