import bd from "../basedatos.js";
import bcryptjs from "bcrypt"
import clientes from "../models/cliente.js"; 

const httpClientes = {
    getClientes: async (req, res)=>{
        const cliente = await clientes.find()
        res.json(cliente);
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
       
        const salt = bcryptjs.genSaltSync();
        holder.contrasena = bcryptjs.hashSync(contrasena, salt)

        await cliente.save()
        res.json({ cliente });
    },

    deleteCliente:async(req, res)=>{
        const { cedula } = req.params;
        const cliente = await clientes.findOneAndDelete({ cedula }); // Use Cliente instead of cliente
        res.json({ cliente });
    },
}
export default httpClientes;