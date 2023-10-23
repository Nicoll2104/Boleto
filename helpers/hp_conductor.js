import Conductor from "../models/conductor.js";

const helpersConductor = {
    validarCedulaUnica: async (cedula, id) => {
        const conductorConCedula = await Conductor.findOne({ cedula });
        
        if (conductorConCedula && conductorConCedula._id != id) {
            throw new Error(`Ya existe un conductor con la cédula ${cedula}`);
        }
    }
};
export default helpersConductor