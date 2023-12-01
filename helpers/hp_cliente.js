import Cliente from "../models/cliente.js";

const helpersCliente = {
    validarCedulaUnica: async (cedula, id) => {
        const clienteConCedula = await Cliente.findOne({ cedula });
        
        if (clienteConCedula && clienteConCedula._id != id) {
            throw new Error(`Ya existe un cliente con la cédula ${cedula}`);
        }
    },
    editarCliente: async (cedula, id, req) => {
        const clienteExistente = await Cliente.findById(id);
        if (!clienteExistente) {
            throw new Error(`No se encontró un cliente con el ID ${id}`);
        }
    
        const clienteConCedula = await Cliente.findOne({ cedula });
        if (clienteConCedula && clienteConCedula._id != id) {
            throw new Error(`Ya existe un cliente con la cédula ${cedula}`);
        }

    }
}    

export default helpersCliente;