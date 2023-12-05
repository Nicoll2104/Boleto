import conductor from "../models/conductor.js";

const httpConductor = {
  getConductores: async (req, res) => {
    try {
      const conductores = await conductor.find()
      res.json(conductores)
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al obtener los datos del conductor.' });
    }
  },

  getConductor: async (req, res) => {
    const { id } = req.params
    try {
      const conductores = await conductor.findOneAndDelete({ _id: id });
      res.json({ conductores })
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al obtener los datos del conductor.' });
    }
  },

  postConductor: async (req, res) => {
    try {
      const { cedula, nombre, n_licencia, direccion, telefono, } = req.body;
      const conductores = new conductor({ cedula, nombre, n_licencia, direccion, telefono, });

      await conductores.save();
      res.json({ mensaje: 'El conductor se agrego con éxito' });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  putConductor: async (req, res) => {
    const { id } = req.params
    const { cedula, nombre, n_licencia, direccion, telefono, } = req.body;
    try {
      const conductores = await conductor.findByIdAndUpdate(id, { cedula, nombre, n_licencia, direccion, telefono, }, { new: true });

      if (!conductores) {
        return res.status(404).json({ mensaje: 'El conductor no existe' });
      }
      res.json({ mensaje: 'El conductor ha sido actualizado correctamente' })
    } catch (error) {
      res.status(400).json({ error: "Error en el servidor" });
    }

  },

  deleteConductor: async (req, res) => {
    try {
      const { id } = req.params;
      const conductorEliminado = await conductor.findByIdAndDelete(id);

      if (!conductorEliminado) {
        return res.status(404).json({ mensaje: 'El conductor no existe' });
      }

      res.json({ mensaje: 'El conductor ha sido eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al intentar eliminar al conductor' });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params
      const conductores = await conductor.findByIdAndUpdate(id, { status: 0 }, { new: true })
      res.json({ conductores })
    } catch (error) {
      res.status(400).json({ error: 'Se produjo un error' })

    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params
      const conductores = await conductor.findByIdAndUpdate(id, { status: 1 }, { new: true })
      res.json({ conductores })
    } catch (error) {
      res.status(400).json({ error: 'Se produjo un error' })
    }
  }

}
export default httpConductor;



