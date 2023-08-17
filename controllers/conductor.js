
import conductor from "../models/conductor.js";

const httpConductor = {
 getConductores:async(req,res)=>{
    try{
      const conductores = await conductor.find()
    res.json(conductores)
    }catch (error){
      res.status(500).json({ error: 'Ocurrió un error al obtener los datos del conductor.' });
    }
 },
 getConductor:async(req,res)=>{

  const {id} =req.params
  try{
   const conductores = await conductor.findById(id)
   res.json({conductores})
  }catch(error){
   res.status(500).json({ error: 'Ocurrió un error al obtener los datos del conductor.' });
  }
 },
 
postConductor: async (req, res) => {
   try {
     const {cedula, edad, nombre, apellido, n_licencia, direccion, telefono,} = req.body;
 
     const conductores = new conductor({cedula, edad, nombre, apellido, n_licencia, direccion, telefono,});
 
     await conductores.save();
     res.json({ conductores });
   } catch (error) {
     res.status(500).json({ error: "Error interno del servidor" });
   }
 },

putConductor: async (req, res)=>{
 try{
   const {id} = req.params
   const  {cedula, edad, nombre, apellido, n_licencia, direccion, telefono,}= req.body;
   const conductores = await conductor.findByIdAndUpdate(id,{cedula, edad, nombre, apellido, n_licencia, direccion, telefono,},{new:true});
   res.json({ mensaje: 'El conductor ha sido actualizado correctamente', conductores })
 }catch(error){
   res.status(400).json({ error: "Error en el servidor" });
 }
},

deleteConductor:async(req,res)=>{
try{
   const { id } = req.params;
   const conductores = await conductor.findOneAndDelete({ id});

   if(!conductores){
      return res.status(404).json({ mensaje: 'El conductor no existe' });
   }
   res.json({ mensaje: 'El conductor ha sido eliminado'});
}catch(error){
   res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el conductor' });
}
   
 },

 putInactivar: async (req,res)=>{
   try {
       const {id}=req.params
       const conductores=await conductor.findByIdAndUpdate(id,{status:0},{new:true})
       res.json({conductores})
   } catch (error) {
       res.status(400).json({error})
       
   }
 },

 putActivar: async (req,res)=>{
   try {
       const {id}=req.params
       const conductores=await conductor.findByIdAndUpdate(id,{status:1},{new:true})
       res.json({conductores})
   } catch (error) {
       res.status(400).json({error})
   }
 }

}
export default httpConductor;
// EL DELETE NO SIRVE CORRECTAMENTE


