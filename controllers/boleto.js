import boleto from "../models/boleto.js";

const httpBoletos = {

  getBoletos: async (req, res) => {
    try {
      const boletos = await boleto.find()
        .populate("cliente", ["nombre", "telefono"])
        .populate("bus", ["placa"])
        .populate("ruta", ["origen", "destino"])
        .populate("conductor", ["nombre", "telefono"])
        .populate("vendedor", ["nombre", "telefono"]);

      res.json({ boletos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getBoletosid: async (req, res) => {
    try {
      const{id} = req.params
      const boletos = await boleto.findById(id)
        .populate("cliente", ["nombre", "telefono"])
        .populate("bus", ["placa"])
        .populate("ruta", ["origen", "destino"])
        .populate("conductor", ["nombre", "telefono"])
        .populate("vendedor", ["nombre", "telefono"]);
      res.json({ boletos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getBoletosPorFecha: async (req, res) => {
    try {
      const { fecha } = req.params;
      const boletos = await boleto.find({ "fechas.fecha_venta": fecha })
        .populate("cliente", ["nombre", "telefono"])
        .populate("bus", ["placa"])
        .populate("ruta", ["origen", "destino"])
        .populate("conductor", ["nombre", "telefono"])
        .populate("vendedor", ["nombre", "telefono"]);

      res.json({ boletos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getBoletosPorVendedor: async (req, res) => {  //listar tikects de vendedor
    try {
        const { vendedor_id } = req.params;
        if (!vendedor_id) {
            return res.status(400).json({ error: 'Debes proporcionar el ID del vendedor.' });
        }

        const boletos = await tikect.find({ vendedor: vendedor_id })

        res.json({ boletos });
    } catch (error) {
        res.status(400).json({ error: "Algo salió mal" });
    }
  },

  getBoletosPorConductor: async (req, res) => {
    try {
      const { idConductor } = req.params;
      const boletos = await boleto.find({ conductor: idConductor })
        .populate("cliente", ["nombre", "telefono"])
        .populate("bus", ["placa"])
        .populate("ruta", ["origen", "destino"])
        .populate("conductor", ["nombre", "telefono"])
        .populate("vendedor", ["nombre", "telefono"]);

      res.json({ boletos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  postBoleto: async (req, res) => {
    try {
      const { fechas, Precio, cliente, bus, ruta, conductor, vendedor } = req.body;
      const nuevoBoleto = new boleto({ fechas, Precio, cliente, bus, ruta, conductor, vendedor });

      await nuevoBoleto.save();
      res.json({ mensaje: 'El boleto se agregó con éxito', boleto: nuevoBoleto });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  putBoleto: async (req, res) => {
    const { id } = req.params;
    const { fechas, Precio, cliente, bus, ruta, conductor, vendedor } = req.body;

    try {
      const boletoActualizado = await boleto.findByIdAndUpdate(id, { fechas, Precio, cliente, bus, ruta, conductor, vendedor }, { new: true });

      if (!boletoActualizado) {
        return res.status(404).json({ mensaje: 'El boleto no existe' });
      }

      res.json({ mensaje: 'El boleto se actualizó con éxito', boleto: boletoActualizado });
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

putInactivar: async (req,res)=>{
  try {
      const {id}=req.params
      const boletos=await boletos.findByIdAndUpdate(id,{status:0},{new:true})
      res.json({boletos})
  } catch (error) {
      res.status(400).json({error})
      
  }
},

putActivar: async (req,res)=>{
  try {
      const {id}=req.params
      const boletos=await boletos.findByIdAndUpdate(id,{status:1},{new:true})
      res.json({boletos})
  } catch (error) {
      res.status(400).json({error})
  }
}
};

export default httpBoletos;
