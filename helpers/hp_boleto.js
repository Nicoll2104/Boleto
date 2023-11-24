import Boleto from "../models/boleto.js";

const helpersBoleto = {
  validarAsientoUnico: async (asientos, id) => {
    const boletoExistente = await Boleto.findOne({ asientos });

    if (boletoExistente && boletoExistente._id !== id) {
      throw new Error(`El asiento ya ha sido vendido.`);
    }
  }
};

export default helpersBoleto;
