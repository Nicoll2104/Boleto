import Cliente from "../models/cliente.js";

const helpersEdicionCliente = {
    editarCliente: async (id, nuevosDatos) => {
        const clienteExistente = await Cliente.findById(id);

        if (!clienteExistente) {
            throw new Error(`No se encontró un cliente con el ID ${id}`);
        }
        if (nuevosDatos.cedula && nuevosDatos.cedula !== clienteExistente.cedula) {
            await helpersCliente.validarCedulaUnica(nuevosDatos.cedula, id);
        }
        clienteExistente.cedula = nuevosDatos.cedula || clienteExistente.cedula;
        clienteExistente.nombre = nuevosDatos.nombre || clienteExistente.nombre;
        clienteExistente.telefono = nuevosDatos.telefono || clienteExistente.telefono;
        clienteExistente.email = nuevosDatos.email || clienteExistente.email;
        await clienteExistente.save();
        return clienteExistente;
    }
};

export default helpersEdicionCliente;
