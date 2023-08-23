import bus from "../models/bus.js"

const httpbus = {
  postBus: async (req, res) => {
    try {
      const { placa, modelo, soat, n_asiento, empresa_asignada } = req.body;
      const nuevoBus = new bus({ placa, modelo, soat, n_asiento, empresa_asignada });

      await nuevoBus.save();
      res.json({ mensaje: 'El autobús se agregó con éxito', bus });

    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getBuses: async (req, res) => {
      try {
        const buses = await bus.find()
        res.json({buses});
      } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos del autobús.' });
      }
    },

    getBus: async(req, res)=>{
      const {id}=req.params
      try {
          const bus = await bus.findById(id)
          res.json({ bus })
          
      } catch (error) {
          res.status(400).json({error})
      }
    },

  putBus: async (req,res) =>{
    try {
      const {id}=req.params
      const {n_asiento, empresa_asignada, soat}=req.body
      const bus=await 
          bus.findByIdAndUpdate(id,{n_asiento,empresa_asignada, soat},{new:true});
          res.json({ bus })
  } catch (error) {
      res.status(400).json({ error: "Error en el servidor" });
  }
},
    
deleteBus: async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await bus.findByIdAndDelete(id);

    if (!bus) {
      return res.status(404).json({ mensaje: 'El bus no existe' });
    }

    res.json({ mensaje: 'El bus ha sido eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el bus' });
  }
},

putInactivar: async (req,res)=>{
  try {
      const {id}=req.params
      const bus=await bus.findByIdAndUpdate(id,{status:0},{new:true})
      res.json({bus})
  } catch (error) {
      res.status(400).json({error})
      
  }
},

putActivar: async (req,res)=>{
  try {
      const {id}=req.params
      const bus=await bus.findByIdAndUpdate(id,{status:1},{new:true})
      res.json({bus})
  } catch (error) {
      res.status(400).json({error})
  }
}
}
  export default httpbus;