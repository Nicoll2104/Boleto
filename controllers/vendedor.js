
import vendedor from "../models/vendedor.js"; 

const httpVendedor = {
 getVendedores: async(req,res)=>{
   try{
      const vendedores = await vendedor.find()
    res.json(vendedores)
    }catch (error){
      res.status(500).json({ error: 'Ocurrió un error al obtener los datos del vendedor.' });
    }
 },
 getVendedor:async(req,res)=>{

   const {id} =req.params
   try{
    const vendedores = await vendedor.findById(id)
    res.json({vendedores})
   }catch(error){
    res.status(500)
    .json({ error: 'Ocurrió un error al obtener los datos del conductor.' });
   }
  },
  postVendedor: async (req, res) => {
   try {
     const {cedula, nombres, apellidos, n_boletos_vendidos} = req.body;
 
     const conductores = new vendedor({cedula, nombres, apellidos, n_boletos_vendidos});
 
     await conductores.save();
     res.json({ conductores });
   } catch (error) {
     res.status(500).json({ error: "Error interno del servidor" });
   }
 },
  
}

export default httpVendedor;