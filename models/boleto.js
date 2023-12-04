import mongoose from "mongoose";
const boleto = new mongoose.Schema(
    {
        fechas:[{
            fecha_venta: { type: Date, required: false, default: Date.now},
            hora_venta:{type:String, required:false, default: Date.now},
            fecha_salida: { type: Date, required: false, default: Date.now},
            hora_salida: { type: String, required: true },
        }],
        asientos:{type: Number, required: true},
        Precio:{type: Number, required: true},
        cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente',required:true},
        bus:{type:mongoose.Schema.Types.ObjectId,ref:'Bu',required:true},
        ruta:{type:mongoose.Schema.Types.ObjectId,ref:'Ruta',required:true},
        vendedor:{type:mongoose.Schema.Types.ObjectId,ref:'Vendedor',required:true},
    })

    export default mongoose.model("Boleto", boleto)