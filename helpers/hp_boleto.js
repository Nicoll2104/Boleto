import Boleto from "../models/boleto.js";

const helpersBoleto = {
  validarAsientoUnico: async (numeroAsiento, id) => {
    const boletoExistente = await Boleto.findOne({ asientos: numeroAsiento });

    if (boletoExistente && boletoExistente._id !== id) {
      throw new Error(`El asiento ${numeroAsiento} ya ha sido vendido.`);
    }
  }
};

export default helpersBoleto;
