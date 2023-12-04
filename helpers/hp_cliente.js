import Cliente from "../models/cliente.js";

const helpersCliente = {
    validarCedulaUnica: async (cedula, req) => {
        const existe = await Cliente.findOne({ cedula });

      if (existe) {
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(
            `Ya existe esa cedula`
          );
        }else if(req.req.method === 'POST') throw new Error(`Ya existe ese cedula`);
      }
    },
};

export default helpersCliente;