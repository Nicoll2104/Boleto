import Cliente from "../models/cliente.js";

const helpersCliente = {
    validarCedulaUnica: async (cedula, id) => {
        const clienteConCedula = await Cliente.findOne({ cedula });
        
        if (clienteConCedula && clienteConCedula._id != id) {
            throw new Error(`Ya existe un cliente con la cédula ${cedula}`);
        }
    },
    editarCliente: async (id, nuevosDatos) => {
        try {
            // Verificar si el cliente existe
            const clienteExistente = await Cliente.findById(id);
            if (!clienteExistente) {
                throw new Error(`No se encontró un cliente con el ID ${id}`);
            }

            // Verificar si la nueva cédula ya está siendo utilizada por otro cliente
            if (
                nuevosDatos.cedula &&
                nuevosDatos.cedula !== clienteExistente.cedula
            ) {
                const clienteConNuevaCedula = await Cliente.findOne({
                    cedula: nuevosDatos.cedula,
                });
                if (clienteConNuevaCedula) {
                    throw new Error(
                        `Ya existe un cliente con la cédula ${nuevosDatos.cedula}`
                    );
                }
            }

            // Actualizar los datos del cliente permitidos
            clienteExistente.cedula = nuevosDatos.cedula || clienteExistente.cedula;
            clienteExistente.nombre = nuevosDatos.nombre || clienteExistente.nombre;
            clienteExistente.telefono = nuevosDatos.telefono || clienteExistente.telefono;
            clienteExistente.email = nuevosDatos.email || clienteExistente.email;

            // Guardar el cliente actualizado
            const clienteActualizado = await clienteExistente.save();

            return clienteActualizado;
        } catch (error) {
            throw new Error(`Error al editar el cliente: ${error.message}`);
        }
    },
};

export default helpersCliente;
