import bd from "../basedatos.js";
import vendedor from "../models/vendedor.js"; 

const httpVendedor = {
 getVendedor: async(req,res)=>{
    res.json(bd.vendedores);
 }
}

export default httpVendedor;