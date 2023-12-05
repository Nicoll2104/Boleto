import Conductor from "../models/conductor.js";

const helpersConductor = {
  validarCedulaUnica: async (cedula, req) => {
    try {
      const existe = await Conductor.findOne({ cedula });

      if (existe) {
        if (req.req.method === "PUT" && req.req.body._id !== existe._id) {
          throw new Error(`Ya existe esa cédula`);
        } else if (req.req.method === 'POST') {
          throw new Error(`Ya existe esa cédula`);
        }
      }
    } catch (error) {
      throw new Error(`Error en la validación de la cédula única: ${error.message}`);
    }
  },

  validarN_licencia: async (n_licencia, id) => {
    const conductorConLicencia = await Conductor.findOne({ n_licencia });

    if (conductorConLicencia && conductorConLicencia._id != id) {
      throw new Error(`Ya existe un conductor con la licencia ${n_licencia}`);
    }
  },
};
export default helpersConductor;
