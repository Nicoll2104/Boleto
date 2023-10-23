import Vendedor from "../models/vendedor.js";

const helpersVendedor = {
    validarCedulaUnica: async (cedula, id) => {
        const vendedorConCedula = await Vendedor.findOne({ cedula });
        
        if (vendedorConCedula && vendedorConCedula._id != id) {
            throw new Error(`Ya existe un vendedor con la cédula ${cedula}`);
        }
    }
};
export default helpersVendedor