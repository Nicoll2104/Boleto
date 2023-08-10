import mongoose from "mongoose";
const bus = new mongoose.Schema(
    {
        placa:{type: Number, required: true,minlength:8},
        modelo:{type: String, required: true},
        soat:{type: String, required:true},
        n_asiento:{type:Number,required:true},
        empresa_asignada: { type: String, require:true },
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1}
    })

    export default mongoose.model("Bu", bus)