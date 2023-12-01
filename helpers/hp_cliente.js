import Cliente from "../models/cliente.js";

const helpersClientes = {
    editarCliente: async (id, nuevosDatos) => {
        try {
            const clienteExistente = await Cliente.findById(id);

            if (!clienteExistente) {
                throw new Error(`No se encontró un cliente con el ID ${id}`);
            }

            // Verificar si se desea cambiar la cédula
            if (nuevosDatos.cedula !== undefined && nuevosDatos.cedula !== clienteExistente.cedula) {
                await helpersClientes.validarCedulaUnica(nuevosDatos.cedula, id);
                clienteExistente.cedula = nuevosDatos.cedula;
            }

            // Actualizar otros campos
            clienteExistente.nombre = nuevosDatos.nombre || clienteExistente.nombre;
            clienteExistente.telefono = nuevosDatos.telefono || clienteExistente.telefono;
            clienteExistente.email = nuevosDatos.email || clienteExistente.email;

            // Guardar los cambios en la base de datos
            await clienteExistente.save();

            return clienteExistente;
        } catch (error) {
            console.error("Error al editar cliente:", error.message);
            throw new Error("Error al editar cliente");
        }
    },

    validarCedulaUnica: async (cedula, id) => {
        const clienteConCedula = await Cliente.findOne({ cedula });

        if (clienteConCedula && clienteConCedula._id != id) {
            throw new Error(`Ya existe un cliente con la cédula ${cedula}`);
        }
    }
};

export default helpersClientes;
