const bd ={
    boletos:[
        {
            fechas:[{
                fecha_venta: "12/05/12",
                hora_venta:"12/08",
                fecha_salida: "12/05/12",
                hora_salida:"12/08",
            }],
            Precio:50000,
            cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente',required:true},
            bus:{type:mongoose.Schema.Types.ObjectId,ref:'Bus',required:true},
            ruta:{type:mongoose.Schema.Types.ObjectId,ref:'Ruta',required:true},
            conductor:{type:mongoose.Schema.Types.ObjectId,ref:'Conductor',required:true},
            vendedor:{type:mongoose.Schema.Types.ObjectId,ref:'Vendedor'}
        }
    ]
}

export default bd;