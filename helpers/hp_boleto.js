import Boleto from "../models/boleto.js";

const helpersAsiento = {
  validarAsientoDisponible: async (asiento) => {
    try {
      // Verificar si el asiento está en algún boleto vendido
      const boletoExistente = await Boleto.findOne({ asientos: asiento });

      if (boletoExistente) {
        throw new Error(`El asiento ${asiento} ya está ocupado.`);
      }

      // Si el asiento no está ocupado, está disponible para vender
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default helpersAsiento;

