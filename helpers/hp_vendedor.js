import Vendedor from "../models/vendedor.js";

const helpersVendedor = {
    validarCedulaUnica: async (cedula, req) => {
        const existe = await Vendedor.findOne({ cedula });

      if (existe) {
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(
            `Ya existe esa cedula`
          );
        }else if(req.req.method === 'POST') throw new Error(`Ya existe ese cedula`);
      }
    },
};
export default helpersVendedor