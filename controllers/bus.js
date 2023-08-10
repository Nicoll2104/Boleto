import bcryptjs from "bcrypt";
import Bus from "../models/bus.js"

const httpbus = {
  postBus: async (req, res) => {
    try {
      const { placa, modelo, soat, n_asiento } = req.body;
      const bus = new Bus({ placa, modelo, soat, n_asiento });

      await bus.save();
      res.json({ bus });

    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getBus: async (req, res) => {
      try {
        const bus = await Bus.find()
        res.json({bus});
      } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos del autobús.' });
      }
    },

  putBus: async (req,res) =>{
    const {placa} = req.params
    const { soat } =req.body

    const bus = await Bus.findOneAndUpdate({placa},{soat}, {new:true})

    if(!bus){
      return res.status(404).json({mensaje: 'el bus no existe'});
    }
    res.json ({bus});
    },
    
    deleteBus: async (req, res) => {
      try {
        const { placa } = req.params;
        const bus = await Bus.findOneAndDelete({ placa });
    
        if (!bus) {
          return res.status(404).json({ mensaje: 'El bus no existe' });
        }
    
        res.json({ mensaje: 'El bus ha sido eliminado' });
      } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el bus' });
      }
    }
  }
    export default httpbus;