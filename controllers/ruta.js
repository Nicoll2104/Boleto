import bd from "../basedatos.js";
import ruta from "../models/ruta.js"; 

const httpRutas = {
 getRuta:async(req,res)=>{
  res.json(bd.rutas);
 }
}

export default httpRutas;