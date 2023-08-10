import ruta from "../models/ruta.js"; 

const httpRutas = {
    getRuta: async (req, res)=>{
        const rutas = await ruta.find()
        res.json(rutas);
    },

    getRutaid:  async(req, res)=>{
        const {id}=req.params
        try {
            const rutas = await ruta.findById(id)
            res.json({ rutas })
            
        } catch (error) {
            res.status(400).json({error})
        }
      },

    postRuta: async (req, res) =>{
        try{
            const {origen, destino, horario, distancia, duracion, fecha} = req.body;
            const rutas = new ruta({origen, destino, horario, distancia, duracion, fecha});
        
        await ruta.save();
        res.json({mensaje: 'La ruta se agrego con exito'});
        }catch(error){
            res.status(500).json({error: 'Error interno del servidor'})
        }
    },

    putRuta: async (req, res) =>{
        const { id } = req.params;
        const {origen, destino, horario, distancia, duracion, fecha} = req.body

        try{
            const rutas = await rutas.finfindByIdAndUpdate(id, {origen, destino, horario, distancia, duracion, fecha}, {new: true});

            if (!rutas){
                return res.status(404).json({ mensaje: 'La ruta no existe' });
            }
            res.json({ mensaje: 'La ruta se actualizado con éxito', rutas });
        } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    },

    deleteRuta: async (req, res) =>{
        try{
            const { id } = req.params;
            const rutas = await ruta.findByIdAndDelete ( id );

            if (!rutas){
                return res.status(404).json({ mensaje: 'La ruta no existe' });
            }
            res.json({ mensaje: 'La ruta ha sido eliminada' });
        } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar al cliente' });
        }
        },

        putInactivar: async (req,res)=>{
            try {
                const {id}=req.params
                const rutas=await ruta.findByIdAndUpdate(id,{status:0},{new:true})
                res.json({rutas})
            } catch (error) {
                res.status(400).json({error})
                
            }
          },
      
          putActivar: async (req,res)=>{
            try {
                const {id}=req.params
                const rutas=await ruta.findByIdAndUpdate(id,{status:1},{new:true})
                res.json({rutas})
            } catch (error) {
                res.status(400).json({error})
            }
          }
    }
export default httpRutas;