import Conductor from "../models/conductor.js";

const helpersConductor = {
  validarCedulaUnica: async (cedula, req) => {
    const existe = await Conductor.findOne({ cedula });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(
        `Ya existe esa cedula`
      );
    }else if(req.req.method === 'POST') throw new Error(`Ya existe ese cedula`);
  }
},

  validarN_licencia: async (n_licencia, req) => {
    const conductorConLicencia = await Conductor.findOne({ n_licencia });

    if (req.req.method === "PUT" && req.req.body._id != conductorConLicencia._id) {
      throw new Error(
        `Ya existe la licencia ${n_licencia}`
      );
    }else if(req.req.method === 'POST') throw new Error(`Ya existe la licencia ${n_licencia}`);
  },
};
export default helpersConductor;
