import { Router } from "express";
import { check } from "express-validator";
import httpBoletos from "../controllers/boleto.js";
import { validarcampos } from "../middlewares/validarcampos.js";
import { validarJWT } from "../middlewares/validar.js";

const router = Router();

router.get("/ver", httpBoletos.getBoletos);

router.get("/boleto/:id", httpBoletos.getBoletosid);

router.get("/fecha/:fecha", httpBoletos.getBoletosPorFecha);

router.get("/vendedor/:vendedor_id", httpBoletos.getBoletosPorVendedor);


router.get("/conductor/:idConductor", httpBoletos.getBoletosPorConductor);

router.post("/agregar", [
  check("fechas", "Fechas inválidas").isArray(),
  check("precio", "Precio inválido").isNumeric(),
  check("cliente", "id de cliente inválido").isMongoId(),
  check("bus", "id de bus inválido").isMongoId(),
  check("ruta", "id de ruta inválido").isMongoId(),
  check("conductor", "id de conductor inválido").isMongoId(),
  check("vendedor", "id de vendedor inválido").optional().isMongoId(),
  validarcampos,
], httpBoletos.postBoleto);

router.put("/modificar/:id", [
    validarcampos,
    check("fechas", "Fechas inválidas").isArray(),
    check("precio", "Precio inválido").isNumeric(),
    check("cliente", "id de cliente inválido").isMongoId(),
    check("bus", "id de bus inválido").isMongoId(),
    check("ruta", "id de ruta inválido").isMongoId(),
    check("conductor", "id de conductor inválido").isMongoId(),
    check("vendedor", "id de vendedor inválido").optional().isMongoId(),
  ], httpBoletos.putBoleto);

router.delete("/eliminar/:id", [
    check("id", "Digite id").not().isEmpty(),
    check("id", "Digite id").isMongoId(),
    validarcampos
], httpBoletos.deleteBoleto);

export default router;
