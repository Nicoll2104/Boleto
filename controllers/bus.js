import Bus from "../models/bus.js";

const httpbus = {
  
  getBuses: async (req, res) => {
    try {
      const buses = await Bus.find();
      console.log(buses);
      const busesPopulatePromesas = buses.map(async (e)=>{
        const busesPopulado = await Bus.findById(e._id)
        .populate("conductor");
        return busesPopulado;
      });

      const busesPopulate = await Promise.all(busesPopulatePromesas);
      
      res.json({ busesPopulate });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Ocurrió un error al obtener los datos del autobús.' });
    }
  },

  getBus: async (req, res) => {
    const { id } = req.params;
    try {
      const bus = await Bus.findById(id);
      res.json({ bus });
    } catch (error) {
      res.status(400).json({ error: 'No se encontro el id' });
    }
  },

  postBus: async (req, res) => {
    try {
      const { placa, modelo,conductor, soat, n_asiento, empresa_asignada } = req.body;
      const nuevoBus = new Bus({ placa, modelo,conductor ,soat, n_asiento, empresa_asignada });
      await nuevoBus.save();
      const busesPopulado = await Bus.findById(nuevoBus._id)
        .populate("conductor")
      res.json({ mensaje: 'El autobús se agregó con éxito', bus: busesPopulado });
    } catch (error) {
      res.status(400).json({ error: 'Error interno del servidor' });
    }
  },

  putBus: async (req, res) => {
    try {
      const { id } = req.params;
      const { placa, modelo,conductor ,soat, n_asiento, empresa_asignada } = req.body;
      const bus = await Bus.findByIdAndUpdate(id, { placa, modelo,conductor ,soat, n_asiento, empresa_asignada }, { new: true });
      
      if(!bus){
        return res.status(404).json({ mensaje: 'El bus no existe' });
      }
      
      const busesPopulado = await Bus.findById(bus._id)
        .populate("conductor")

      res.json({ mensaje: 'El boleto se actualizó con éxito',bus:busesPopulado });
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  deleteBus: async (req, res) => {
    try {
      const { id } = req.params;
      const bus = await Bus.findByIdAndDelete(id);

      if (!bus) {
        return res.status(404).json({ mensaje: 'El bus no existe' });
      }

      res.json({ mensaje: 'El bus ha sido eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el bus' });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const bus = await Bus.findByIdAndUpdate(id, { status: 0 }, { new: true });
      res.json({ bus });
    } catch (error) {
      res.status(400).json({ error: 'Se produjo un error' });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const bus = await Bus.findByIdAndUpdate(id, { status: 1 }, { new: true });
      res.json({ bus });
    } catch (error) {
      res.status(400).json({ error: 'Se produjo un error' });
    }
  }
};

export default httpbus;
