import Cliente from "../models/cliente.js";

const helpersEdicionCliente = {
    validarCedulaUnica: async (cedula, id) => {
        const clienteConCedula = await Cliente.findOne({ cedula });
        
        if (clienteConCedula && clienteConCedula._id != id) {
            throw new Error(`Ya existe un cliente con la cédula ${cedula}`);
        }
    },
    editarCliente: async (id, nuevosDatos) => {
        try {
            const clienteExistente = await Cliente.findById(id);

            if (!clienteExistente) {
                throw new Error(`No se encontró un cliente con el ID ${id}`);
            }
            if (nuevosDatos.cedula !== undefined && nuevosDatos.cedula !== clienteExistente.cedula) {
                await helpersCliente.validarCedulaUnica(nuevosDatos.cedula, id);
                clienteExistente.cedula = nuevosDatos.cedula;
            }

            clienteExistente.nombre = nuevosDatos.nombre || clienteExistente.nombre;
            clienteExistente.telefono = nuevosDatos.telefono || clienteExistente.telefono;
            clienteExistente.email = nuevosDatos.email || clienteExistente.email;

            await clienteExistente.save();
            return clienteExistente;
        } catch (error) {
            console.error("Error al editar cliente:", error.message);
            throw new Error("Error al editar cliente");
        }
    }
};

export default helpersEdicionCliente;
