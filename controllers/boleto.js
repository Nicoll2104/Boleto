import bd from "../basedatos.js";
import boleto from "../models/boleto.js";

const httpBoletos = {
  getboletos: async (req, res) => {
    res.json(boleto);
  },
  postBoletos: async (req, res) => {
    try {
      const { Precio, cliente, bus, ruta, conductor, vendedor } = req.body;
      const { fecha_venta, hora_venta, fecha_salida, hora_salida } = req.body;
      const fechas = { fecha_venta, hora_venta, fecha_salida, hora_salida };
      const boleto = {fechas, Precio, cliente, bus, ruta, conductor, vendedor,
      };
      await boleto.save();
      res.json({ boleto });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  deleteBoleto: async (req, res) => {
    const { cliente } = req.params;
    const boleto = await boleto.findOneAndDelete({ cliente });
    res.json({ boleto });
  }}

export default httpBoletos;
