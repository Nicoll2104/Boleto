import boleto from "../models/boleto.js";
import helpersBoleto from "../helpers/hp_boleto.js";

const httpBoletos = {

  getBoletos: async (req, res) => {
    try {
      const boletos = await boleto.find()
      console.log(boletos);
      const boletoPopulatePromesas = boletos.map(async (e) => {
        const boletoPopulado = await boleto.findById(e._id)
          .populate("cliente")
          .populate({
            path: "bus",
            populate: [{ path: "conductor" }],
          })
          .populate("ruta")
          .populate("vendedor");
        return boletoPopulado;
      });
  
      const boletoPopulate = await Promise.all(boletoPopulatePromesas);
      
      res.json({ boletoPopulate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los datos del boleto.' });
    }
  },
  

  getBoletosid: async(req, res) => {
    try {
      const { id } = req.params;
      const boletos = await boleto.findById(id);

      res.json({ boletos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getBoletosPorFecha: async (req, res) => {
    try {
        const { fecha } = req.params;
        const boletos = await boleto.find({ "fechas.fecha_venta": fecha })
            .populate("cliente")
            .populate({
              path: "bus",
              populate: [{ path: "conductor" }],
            })
            .populate("ruta")
            .populate("vendedor");
        res.json({ boletos });
    } catch (error) {
        res.status(400).json({ error });
    }
  },


  getBoletosPorVendedor: async (req, res) => {
    try {
        const { vendedor_id } = req.params;
        if (!vendedor_id) {
            return res.status(400).json({ error: 'Debes proporcionar el ID del vendedor.' });
        }

        const boletos = await boleto.find({ vendedor: vendedor_id })
            .populate("cliente")
            .populate({
              path: "bus",
              populate: [{ path: "conductor" }],
            })
            .populate("ruta")
            .populate("vendedor")
        res.json({ boletos });
    } catch (error) {
        res.status(400).json({ error: "Algo salió mal" });
    }
  },

  getAsientos: async(req,res)=>{
    const { fecha_salida, bus, ruta} = req.body
    console.log( fecha_salida,bus, ruta);

    const fs1 = new Date(fecha_salida + "T00:00:00.000Z");
    const fs2 = new Date(fecha_salida + "T23:59:59.000Z");
    const asientos = await boleto.find({ fecha_salida: { $gte: fs1, $lte: fs2 }, bus, ruta });

    res.json(asientos)

  },

  postBoleto: async (req, res) => {
    try {
      const { fecha_venta, hora_venta, fecha_salida, asientos, Precio, cliente, bus, ruta, vendedor } = req.body;
      const nuevoBoleto = new boleto({ fecha_venta, hora_venta, fecha_salida, asientos, Precio, cliente, bus, ruta, vendedor });

      await nuevoBoleto.save();
      const boletoPopulado = await boleto.findById(nuevoBoleto._id)
        .populate("cliente")
        .populate({
          path: "bus",
          populate: [{ path: "conductor" }],
        })
        .populate("ruta")
        .populate("vendedor");
      res.json({ mensaje: 'El boleto se agregó con éxito', boleto: boletoPopulado });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  putBoleto: async (req, res) => {
    const { id } = req.params;
    const { fecha_venta, hora_venta, fecha_salida, asientos, Precio, cliente, bus, ruta, vendedor } = req.body;

    try {
      const boletoActualizado = await boleto.findByIdAndUpdate(id, { fecha_venta, hora_venta, fecha_salida, asientos, Precio, cliente, bus, ruta, vendedor }, { new: true });

      if (!boletoActualizado) {
        return res.status(404).json({ mensaje: 'El boleto no existe' });
      }

      const boletoPopulado = await boleto.findById(boletoActualizado._id)
        .populate("cliente")
        .populate({
          path: "bus",
          populate: [{ path: "conductor" }],
        })
        .populate("ruta")
        .populate("vendedor");
      res.json({ mensaje: 'El boleto se actualizó con éxito', boleto: boletoPopulado });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  deleteBoleto: async (req, res) => {
    const { id } = req.params;
    try {
      const boletoEliminado = await boleto.findByIdAndDelete(id);

      if (!boletoEliminado) {
        return res.status(404).json({ mensaje: 'El boleto no existe' });
      }
      res.json({ mensaje: 'El boleto ha sido eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
}

export default httpBoletos;
