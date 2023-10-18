import bcryptjs from "bcrypt";
import clientes from "../models/cliente.js"; 


const httpClientes = {
    getClientes: async (req, res)=>{
        const cliente = await clientes.find()
        res.json(cliente);
    },

    getClientesid: async(req, res)=>{
      const {id}=req.params
      try {
          const cliente = await clientes.findById(id)
          res.json({ cliente })
          
      } catch (error) {
          res.status(400).json({error: 'No se encontro el id'})
      }
    },

    postClientes: async (req, res) => {
      try {
        const { cedula, nombre, telefono, email, } = req.body;
        const cliente = new clientes({ cedula, nombre, telefono, email,});
    
        await cliente.save();
        res.json({ mensaje: 'Cliente agregado con éxito'});
      } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor'});
      }
    },

    putClientes: async (req, res) => {
      const { id } = req.params;
      const { telefono, email, } = req.body;
    
      try {
        const cliente = await clientes.findByIdAndUpdate(id, { telefono, email }, { new: true });
        
        if (!cliente) {
          return res.status(404).json({ mensaje: 'El cliente no existe' });
        }
    
        res.json({ mensaje: 'Cliente actualizado con éxito', cliente });
      } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    },

    deleteClientes: async (req, res) => {
      try {
        const { id } = req.params;
        const cliente = await clientes.findByIdAndDelete( id ); 
      
        if (!cliente) {
          return res.status(404).json({ mensaje: 'El cliente no existe' });
        }
    
        res.json({ mensaje: 'El cliente ha sido eliminado' });
      } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar al cliente' });
      }
    },

    putInactivar: async (req,res)=>{
      try {
          const {id}=req.params
          const cliente=await clientes.findByIdAndUpdate(id,{status:0},{new:true})
          res.json({cliente})
      } catch (error) {
        console.log(error);
          res.status(400).json({error: 'Se produjo un error'})
          
      }
    },

    putActivar: async (req,res)=>{
      try {
          const {id}=req.params
          const cliente=await clientes.findByIdAndUpdate(id,{status:1},{new:true})
          res.json({cliente})
      } catch (error) {
        console.log(error);
          res.status(400).json({error: 'Se produjo un error'})
      }
    }

} 
export default httpClientes;