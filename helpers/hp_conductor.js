import Conductor from "../models/conductor.js";

const helpersConductor = {
  validarCedulaUnica: async (cedula, req) => {
    try {
      const { method, body: { _id } } = req.req;

      const existe = await Conductor.findOne({ cedula });

      if (existe) {
        if (method === "PUT" && _id !== existe._id.toString()) {
          throw new Error(`Ya existe esa cédula`);
        } else if (method === "POST") {
          throw new Error(`Ya existe esa cédula`);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  validarN_licencia: async (n_licencia, id) => {
    try {
      const conductorConLicencia = await Conductor.findOne({ n_licencia });

      if (conductorConLicencia && conductorConLicencia._id !== id) {
        throw new Error(`Ya existe un conductor con la licencia ${n_licencia}`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default helpersConductor;

