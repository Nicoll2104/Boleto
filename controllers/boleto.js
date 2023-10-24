import Boleto from "../models/boleto.js";

const httpBoletos = {
  getBoletos: async (req, res) => {
    try {
      const boletos = await Boleto.find()
        .populate("cliente")
        .populate("bus")
        .populate("ruta")
        .populate("conductor")
        .populate("vendedor");

      res.json({ boletos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los datos del boleto.' });
    }
  },

  getBoletosid: async (req, res) => {
    try {
      const { id } = req.params;
      const boletoEncontrado = await Boleto.findById(id);

      if (!boletoEncontrado) {
        return res.status(404).json({ mensaje: 'El boleto no existe' });
      }

      res.json({ boleto: boletoEncontrado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getBoletosPorFecha: async (req, res) => {
    try {
      const { fecha } = req.params;
      const boletos = await Boleto.find({ "fechas.fecha_venta": fecha });

      res.json({ boletos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getBoletosPorVendedor: async (req, res) => {
    try {
      const { vendedor_id } = req.params;
      const boletos = await Boleto.find({ vendedor: vendedor_id });

      res.json({ boletos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getBoletosPorConductor: async (req, res) => {
    try {
      const { idConductor } = req.params;
      const boletos = await Boleto.find({ conductor: idConductor });

      res.json({ boletos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  postBoleto: async (req, res) => {
    try {
      const { fechas, Precio, cliente, bus, ruta, conductor, vendedor } = req.body;
      const nuevoBoleto = new Boleto({ fechas, Precio, cliente, bus, ruta, conductor, vendedor });

      await nuevoBoleto.save();
      res.json({ mensaje: 'El boleto se agregó con éxito', boleto: nuevoBoleto });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  putBoleto: async (req, res) => {
    try {
      const { id } = req.params;
      const { fechas, Precio, cliente, bus, ruta, conductor, vendedor } = req.body;

      const boletoActualizado = await Boleto.findByIdAndUpdate(
        id,
        { fechas, Precio, cliente, bus, ruta, conductor, vendedor },
        { new: true }
      );

      if (!boletoActualizado) {
        return res.status(404).json({ mensaje: 'El boleto no existe' });
      }

      res.json({ mensaje: 'El boleto se actualizó con éxito', boleto: boletoActualizado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  deleteBoleto: async (req, res) => {
    try {
      const { id } = req.params;
      const boletoEliminado = await Boleto.findByIdAndDelete(id);

      if (!boletoEliminado) {
        return res.status(404).json({ mensaje: 'El boleto no existe' });
      }

      res.json({ mensaje: 'El boleto ha sido eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

export default httpBoletos;
