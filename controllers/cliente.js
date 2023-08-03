import bcryptjs from "bcrypt";
import clientes from "../models/cliente.js"; 

const httpClientes = {
    getClientes: async (req, res)=>{
        const cliente = await clientes.find()
        res.json(cliente);
    },

    getClientesCedula: async (req, res)=>{
        const {cedula} = req.params;
        const cliente = await clientes.find({cedula});
        if (cliente == undefined)
        res.status(400).json({error: "Persona no existe"});
        else res.json({cliente})
    }, 

    postClientes: async(req,res)=>{
        const{ cedula, nombre, apellido, edad, telefono, email, contrasena, maleta}= req.body;
        const cliente = new clientes({ cedula, nombre, apellido, edad, telefono, email, contrasena, maleta});
       
        const salt = bcryptjs.genSaltSync();
        cliente.contrasena = bcryptjs.hashSync(contrasena, salt) 

        await cliente.save()
        res.json({ cliente }); 
    },

    deleteClientes: async (req, res) => {
        const { cedula } = req.params;
        const cliente = await clientes.findOneAndDelete({ cedula });
        res.json({ cliente });
    },
} 
export default httpClientes;