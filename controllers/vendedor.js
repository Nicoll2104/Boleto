import vendedor from "../models/vendedor.js"; 
import { generarJWT } from "../middlewares/validar.js"
import bcryptjs from 'bcryptjs'; 
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
      const {cedula,nombre,apellido,telefono,usuario,contrasena} = req.body;
      const vendedores = new vendedor({cedula,nombre,apellido,telefono,usuario,contrasena});
 
      const salt = bcryptjs.genSaltSync()
      vendedores.contrasena = bcryptjs.hashSync(contrasena, salt)
 
      await vendedores.save();
      res.json({ vendedores });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

 putVendedor: async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula, telefono, usuario, contrasena } = req.body;
  
  try {
    const salt = bcryptjs.genSaltSync();
    const contrasenaHash = bcryptjs.hashSync(contrasena, salt);
    
    const vendedores = await vendedor.findByIdAndUpdate(id, { cedula, nombre, apellido, telefono, usuario, contrasena: contrasenaHash }, { new: true });
    
    if (!vendedores) {
      return res.status(404).json({ mensaje: 'El vendedor no existe' });
    }
    
    res.json({ mensaje: 'El vendedor actualizado con éxito', vendedores });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
},
  
 putInactivar: async (req, res) => {
  try {
    const { id } = req.params;
    const vendedores = await vendedor.findByIdAndUpdate(id, { status: 0 }, { new: true });
    res.json({ vendedores });
  } catch (error) {
    res.status(400).json({ error: 'Se produjo un error' });
  }
},

putActivar: async (req, res) => {
  try {
    const { id } = req.params;
    const vendedores = await vendedor.findByIdAndUpdate(id, { status: 1 }, { new: true });
    res.json({ vendedores });
  } catch (error) {
    res.status(400).json({ error: 'Se produjo un error' });
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
  const { usuario, contrasena} = req.body;
  console.log(usuario);

  try {
      const vendedores = await vendedor.findOne({ usuario })

      console.log(vendedores);
      if (!vendedores) {
          return res.status(400).json({
              msg: "El usuario y la contraseña son incorrectos"
          })
      }

      if (vendedores.status == 0) {
        return res.status(400).json({
            msg: "El Vendedor esta inactivo"
        });
    }
    console.log(contrasena);

      const validPassword = bcryptjs.compareSync(contrasena, vendedores.contrasena);
      if (!validPassword) {
          return res.status(401).json({
              msg: "El usuario y la contraseña son incorrectos"
          })
      }

      const token = await generarJWT(vendedores.id);

      res.json({
          vendedores,
          token
      })

  } catch (error) {
      return res.status(500).json({
          msg: "Error del servidor"
      })
  }
},
}

export default httpVendedor;