import bd from "../basedatos.js";
import conductor from "../models/conductor.js"; 

const httpConductor = {
 getConductor:async(req,res)=>{
    res.json(bd.conductores)
 }
}
export default httpConductor;