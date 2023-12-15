import Ruta from "../models/ruta.js";

const helpersRuta = {
    validarHoraUnica: async (horarios, req) => {
        const { origen, destino, _id } = req.req.body;

        // Asegurarse de que horarios es un array
        const horariosArray = Array.isArray(horarios) ? horarios : [horarios];
        const horariosLower = horariosArray.map(h => h.toLowerCase());

        const buscar = await Ruta.findOne({
            origen: { $regex: new RegExp('^' + origen + '$', 'i') },
            destino: { $regex: new RegExp('^' + destino + '$', 'i') },
            horarios: { $in: horariosLower },
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

