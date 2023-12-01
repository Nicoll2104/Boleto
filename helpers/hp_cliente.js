import Cliente from "../models/cliente.js";

const helpersCliente = {
    validarCedulaUnica: async (cedula, id) => {
        const clienteConCedula = await Cliente.findOne({ cedula });
        
        if (clienteConCedula && clienteConCedula._id != id) {
            throw new Error(`Ya existe un cliente con la cédula ${cedula}`);
        }
    },
};

export default helpersCliente;