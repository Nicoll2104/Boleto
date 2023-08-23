
import vendedor from "../models/vendedor.js"; 
import { generarJWT } from "../middlewares/validar.js"
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
     const {nombre,apellido,cedula,telefono,usuario,contrasena} = req.body;
 
     const vendedores = new vendedor({nombre,apellido,cedula,telefono,usuario,contrasena});
 
     await vendedores.save();
     res.json({ vendedores });
   } catch (error) {
     res.status(500).json({ error: "Error interno del servidor" });
   }
 },

 putInactivar: async (req,res)=>{
   try {
       const {id}=req.params
       const vendedores=await vendedor.findByIdAndUpdate(id,{status:0},{new:true})
       res.json({vendedores})
   } catch (error) {
       res.status(400).json({error: 'Se produjo un error'})
       
   }
 },

 putActivar: async (req,res)=>{
   try {
       const {id}=req.params
       const vendedores=await vendedor.findByIdAndUpdate(id,{status:1},{new:true})
       res.json({vendedores})
   } catch (error) {
       res.status(400).json({error: 'Se produjo un error'})
   }
 },
 deletevendedor: async (req, res) => {
  try {
      const { id } = req.params
      const vendedores = await vendedor.findByIdAndDelete(id)

      if(!vendedores){
        return res.status(404).json({mensaje: 'El vendedor no existe'});
      }
      res.json({mensaje: 'El vendedor ha sido eliminado'})
  } catch (error) {
      res.status(400).json({ error: 'Ocurrió un error al intentar eliminar el vendedor' })
  }
},
 login: async (req, res) => {
        const { usuario, password } = req.body;

        try {
            const vendedores = await vendedor.findOne({ usuario })
            if (!vendedores) {
                return res.status(400).json({
                    msg: "vendedor / Password no son correctos"
                })
            }

            if (vendedores.estado === 0) {
                return res.status(400).json({
                    msg: "vendedor Inactivo"
                })
            }

            const validPassword = bcryptjs.compareSync(password, vendedores.password);
            if (!validPassword) {
                return res.status(401).json({
                    msg: "contraseña no son correctos"
                })
            }

            const token = await generarJWT(vendedores.id);

            res.json({
                vendedores,
                token
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
}

export default httpVendedor;