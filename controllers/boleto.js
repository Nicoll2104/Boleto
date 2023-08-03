import bd from "../basedatos.js";

const httpBoletos = {
    getboletos: async (req, res)=>{
        res.json(bd.boletos);
    },
    postBoletos: async(req,res)=>{
            try {
                const {  Precio, cliente, bus, ruta, conductor, vendedor } = req.body;
                const {fecha_venta, hora_venta, fecha_salida, hora_salida} = req.body;
              const fechas = { fecha_venta, hora_venta, fecha_salida, hora_salida};
              const boleto = {fechas, Precio, cliente, bus, ruta, conductor, vendedor}
              bd.boletos.push(boleto);
              res.json({ boleto });
            } catch (error) {
              res.status(500).json({ error: 'Error interno del servidor' });
            }
    }
}

export default httpBoletos;