import mongoose from "mongoose";
const boleto = new mongoose.Schema(
    {
        fechas:[{
            fecha_venta: { type: Date, required: false, default: Date.now},
            hora_venta:{type:Date, required:false, default: Date.now},
            fecha_salida: { type: Date, required: false, default: Date.now},
            hora_salida: { type: Date, required: true },
        }],
        Precio:{type: Number, required: true},
        cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente',required:true},
        bus:{type:mongoose.Schema.Types.ObjectId,ref:'Bus',required:true},
        ruta:{type:mongoose.Schema.Types.ObjectId,ref:'Ruta',required:true},
        conductor:{type:mongoose.Schema.Types.ObjectId,ref:'Conductor',required:true},
        vendedor:{type:mongoose.Schema.Types.ObjectId,ref:'Vendedor'}
    })

    export default mongoose.model("Boleto", boleto)