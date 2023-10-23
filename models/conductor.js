import mongoose from "mongoose";
const conductores = new mongoose.Schema(
    {
        cedula:{type:String, required: true,unique:true,minlength:7,maxlength:10},
        nombre:{type:String, required: true},
        n_licencia:{type:String, required: true, unique:true,minlength:7,maxlength:10},
        direccion:{type:String, required: true},
        telefono:{type:Number, required: true,minlength:10,maxlength:10},
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1}
    })

    export default mongoose.model("Conductor", conductores)