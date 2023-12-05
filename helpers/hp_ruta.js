import Ruta from "../models/ruta.js";

const helpersRuta = {
    validarHoraUnica: async (horarios, id) => {
        const rutaConHora = await Ruta.findOne({ horarios });
        if (rutaConHora && rutaConHora._id != id) {
            throw new Error(`Ya existe una ruta con esa hora`);
        }
    },
};

export default helpersRuta;
