import Conductor from "../models/conductor.js";

const helpersConductor = {
  validarCedulaUnica: async (cedula, req) => {
    const existe = await Conductor.findOne({ cedula });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe esa cedula`);
      } else if (req.req.method === 'POST')
        throw new Error(`Ya existe ese cedula`);
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
