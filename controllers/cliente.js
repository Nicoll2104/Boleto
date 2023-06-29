import bd from "../basedatos.js";
import cliente from "../models/cliente.js";

const httpClientes = {
    getClientes: async (req, res)=>{
        res.json(bd.clientes)
    },
    getClientesCedula: async (req, res)=>{
        const {cedula} = req.params;
        const cliente = bd.clientes.find((cliente)=> cliente.cedula == cedula);
        if (cliente == undefined)
        res.status(400).json({error: "Persona no existe"});
    },
}
export default httpClientes;