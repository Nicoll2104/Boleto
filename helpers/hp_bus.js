import Bus from "../models/bus.js";

const helpersBus = {
    validarPlacaUnica: async (placa, id) => {
        const busConPlaca = await Bus.findOne({ placa });

        if (busConPlaca && busConPlaca._id != id) {
            throw new Error(`Ya existe un bus con la placa ${placa}`);
        }
    },
    validarNumeroUnica: async (numero, id) => {
        const busConNumero = await Bus.findOne({numero });

        if (busConNumero && busConNumero._id  != id){
            throw new Error (`Ya existe un bus con ese numero`)
        }
    }
};

export default helpersBus;
