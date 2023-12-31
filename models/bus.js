import mongoose from "mongoose";
const Bus = new mongoose.Schema(
    {
        placa:{type: String, required: true,minlength:5,maxlength:8},
        numero:{type: Number, required: true},
        conductor:{type:mongoose.Schema.Types.ObjectId,ref:'Conductor',required:true},
        modelo:{type: String, required: true},
        soat:{type: Date, required:true},
        n_asiento:{type:Number,required:true},
        empresa_asignada: { type: String, require:true },
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1}
    })

    export default mongoose.model('Bu', Bus);
