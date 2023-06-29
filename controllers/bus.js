import bd from "../basedatos.js"

const httpbus = {
  postbus: async (req, res) => {
    try {
      const { placa, modelo, soat, n_asientos } = req.body;
      const bus = { placa, modelo, soat, n_asientos };
      bd.bus.push(bus);
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
    }
      }
      

    export default httpbus;