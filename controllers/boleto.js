import bd from "../basedatos.js";

const httpBoletos = {
    getboletos: async (req, res)=>{
        res.json(bd.boletos);
    },
}

export default httpBoletos;