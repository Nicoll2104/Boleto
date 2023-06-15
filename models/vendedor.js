import mongoose from "mongoose";
const vendedor = new mongoose.Schema(
    {
        cedula:{type: String, required:true,unique:true,minlength:7,maxlength:10},
        nombres:{type:String, required:true},
        apellidos:{type:String, required:true},
        n_boletos_vendidos:{type:Number, required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1},
    })
    
    export default mongoose.model("Vendedor", vendedor)