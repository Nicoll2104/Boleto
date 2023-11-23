import Vendedor from "../models/vendedor.js";

const helpersVendedor = {
    validarCedulaUnica: async (cedula, req) => {
        const vendedorConCedula = await Vendedor.findOne({ cedula });

        console.log(req);
        
        if (vendedorConCedula && vendedorConCedula._id != req._id) {
            throw new Error(`Ya existe un vendedor con la cédula ${cedula}`);
        }
    }
};
export default helpersVendedor