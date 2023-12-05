import Ruta from "../models/ruta.js";

const helpersRuta = {
    validarHoraUnica: async (horarios, operationType, existingId = null) => {
        try {
            const existingRoute = await Ruta.findOne({ horarios });

            if (existingRoute) {
                if (operationType === "PUT" && existingId !== null && existingId !== existingRoute._id) {
                    throw new Error("Ya existe esa hora");
                } else if (operationType === "POST") {
                    throw new Error("Ya existe esta hora");
                }
            }
        } catch (error) {
            throw new Error(`Error al validar la hora única: ${error.message}`);
        }
    },
};

export default helpersRuta;
