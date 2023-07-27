import bd from "../basedatos.js";
import clientes from "../models/cliente.js"; 

const httpClientes = {
    getClientes: async (req, res)=>{
        /* const cliente = await cliente.find() */
        res.json(bd.clientes);
    },

    // posibilidad de errror
    getClientesCedula: async (req, res)=>{
        const {cedula} = req.params;
        const cliente = clientes.find((cliente)=> cliente.cedula == cedula);
        if (cliente == undefined)
        res.status(400).json({error: "Persona no existe"});
        else req.json({cliente})
    },

    postClientes: async(req,res)=>{
        const{ cedula, nombre, apellido, edad, telefono, email, contraseña, maleta}= req.body;

        const cliente = { cedula, nombre, apellido, edad, telefono, email, contraseña, maleta};
        bd.clientes.push(cliente);
        res.json({ cliente });
},
}
export default httpClientes;