import Boleto from "../models/boleto.js";

const helpersBoleto = {
  validarAsientoUnico: async (asientos, req) => {
    const { fecha_salida, bus, ruta} = req.req.body
    console.log( fecha_salida,bus, ruta, asientos);

    const fs1 = new Date(fecha_salida + "T00:00:00.000Z");
    const fs2 = new Date(fecha_salida + "T23:59:59.000Z");

    const boletoExistente = await Boleto.findOne({  fecha_salida: { $gte: fs1, $lte: fs2 }, bus, ruta, asientos });

    console.log(boletoExistente);

    if (boletoExistente) {
      throw new Error(`El asiento ya ha sido vendido.`);
    }
  }
};

export default helpersBoleto;
