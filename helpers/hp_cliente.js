import Cliente from "../models/cliente.js";

const helpersCliente = {
    validarCedulaUnica: async (cedula, id) => {
        const clienteConCedula = await Cliente.findOne({ cedula });
        
        if (clienteConCedula && clienteConCedula._id != id) {
            throw new Error(`Ya existe un cliente con la cédula ${cedula}`);
        }
    },

    validarEdicionCliente: async (id, newData) => {
    try {
      if (newData.cedula) {
        await helpersCliente.validarCedulaUnica(newData.cedula, id);
      }
      const clienteEditado = await Cliente.findByIdAndUpdate(id, newData, { new: true });

      return clienteEditado;
    } catch (error) {
      throw new Error(`Error al editar el cliente: ${error.message}`);
    }
  }
};

export default helpersCliente;
