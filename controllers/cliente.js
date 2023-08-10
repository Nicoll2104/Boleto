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

    putClientes: async (req, res) => {
        const { cedula } = req.params;
        const { telefono, email, contrasena } = req.body;
      
        const salt = bcryptjs.genSaltSync();
        const Contrasena = bcryptjs.hashSync(contrasena, salt); 
       
        try {
          const cliente = await clientes.findOneAndUpdate({ cedula },{ telefono, email, contrasena:Contrasena },{ new: true });
      
          if (!cliente) {
            return res.status(404).json({ mensaje: 'el cliente no existe' });
          }
      
          res.json({ cliente });
        } catch (error) {
          res.status(500).json({ error: 'Error interno del servidor' });
        }
      }
      ,

    deleteClientes: async (req, res) => {
      try{
        const { cedula } = req.params;
        const cliente = await clientes.findOneAndDelete({ cedula });
      
        if(!cliente){
          return res.status(404).json({ mensaje: 'El cliente no existe' });
        }

        res.json({ mensaje: 'El cliente ha sido eliminado' });
      } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar al cliente' });
      }
    }
} 
export default httpClientes;