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

            console.log("Cliente existente antes de la edición:", clienteExistente);

            if (
                nuevosDatos.cedula !== undefined &&
                nuevosDatos.cedula !== clienteExistente.cedula
            ) {
                console.log("Validando cédula única...");
                await helpersCliente.validarCedulaUnica(
                    nuevosDatos.cedula,
                    id
                );
                clienteExistente.cedula = nuevosDatos.cedula;
            }

            console.log("Actualizando datos del cliente...");
            clienteExistente.nombre = nuevosDatos.nombre || clienteExistente.nombre;
            clienteExistente.telefono =
                nuevosDatos.telefono || clienteExistente.telefono;
            clienteExistente.email = nuevosDatos.email || clienteExistente.email;

            console.log("Guardando cambios...");
            await clienteExistente.save();

            console.log("Cliente actualizado:", clienteExistente);
            return clienteExistente;
        } catch (error) {
            console.error("Error al editar cliente:", error.message);
            throw new Error("Error al editar cliente");
        }
    },
};

export default helpersEdicionCliente;
