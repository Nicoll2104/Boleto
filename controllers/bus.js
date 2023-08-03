import bd from "../basedatos.js";
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

  getbus: async (req, res) => {
      try {
        res.json(bd.bus);
      } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos del autobús.' });
      }
    },

  putbus: async (req,res) =>{
    const placa = (req.params.placa);
    const { soat } =req.body;
    const bus = bd.bus.find((c) => p.placa == placa );

    if(bus) {
      if (soat) bus.soat =soat;
      res.json({msg: "Informacion actualizada"});
    }else res.status(400).json("Bus no encontrado")
  }

    }
      

    export default httpbus;