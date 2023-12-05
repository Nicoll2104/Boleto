import Ruta from "../models/ruta.js";

const helpersRuta = {
    validarHoraUnica: async (horarios,req)=>{
        const existe = await Ruta.findOne({ horarios });

        if (existe){
            if (req.req.method === "PUT" && req.req.body._id != existe._id){
                throw new Error(
                    `Ya existe esa hora`
                );
            }else if(req.req.method === 'POST') throw new Error(`Ya existe esta hora`);
        }
    },
};

export default helpersRuta;