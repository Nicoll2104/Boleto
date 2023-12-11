import Ruta from "../models/ruta.js";

const helpersRuta = {
    validarHoraUnica: async (horarios, req) => {
        const { origen, destino, _id } = req.req.body;

        const buscar = await Ruta.findOne({
            origen,
            destino,
            horarios,
        });

        if (buscar) {
            if (buscar._id != _id && req.req.method === "PUT")
                throw new Error("Ya existe una ruta con ese horario.");
            else if (req.req.method === "POST")
                throw new Error("Ya existe una ruta con ese horario.");
        }
    },
};

export default helpersRuta;
