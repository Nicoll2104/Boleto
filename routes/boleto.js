import { Router } from "express";
import { check } from "express-validator";
import httpBoletos from "../controllers/boleto.js";
import { validarcampos } from "../middlewares/validarcampos.js";
import { validarJWT } from "../middlewares/validar.js";
import helpersBoleto from "../helpers/hp_boleto.js";

const router = Router();

router.get("/ver", httpBoletos.getBoletos);

router.get("/boleto/:id", httpBoletos.getBoletosid);

router.get("/fecha/:fecha", httpBoletos.getBoletosPorFecha);

router.get("/vendedor/:vendedor_id", httpBoletos.getBoletosPorVendedor);

router.post("/agregar", [
  check("fechas", "Fechas inválidas").isArray(),
  check("asientos", "Asiento es invalido").not().isEmpty().isNumeric().custom(helpersBoleto.validarAsientoUnico),
  check("Precio", "Precio inválido").isNumeric(),
  check("cliente", "id de cliente inválido").isMongoId(),
  check("bus", "id de bus inválido").isMongoId(),
  check("ruta", "id de ruta inválido").isMongoId(),
  check("vendedor", "id de vendedor inválido").isMongoId(),
  check("conductor, id de conductor inválido").isMongoId(),
  validarcampos,
], httpBoletos.postBoleto);

router.put("/modificar/:id", [
    validarcampos,
    check("fechas", "Fechas inválidas").isArray(),
    check("asientos", "Asiento es invalido").not().isEmpty().isNumeric().custom(helpersBoleto.validarAsientoUnico),
    check("Precio", "Precio inválido").isNumeric(),
    check("cliente", "id de cliente inválido").isMongoId(),
    check("bus", "id de bus inválido").isMongoId(),
    check("ruta", "id de ruta inválido").isMongoId(),
    check("vendedor", "id de vendedor inválido").isMongoId(),
    check("conductor, id de conductor inválido").isMongoId(),
  ], httpBoletos.putBoleto);

router.delete("/eliminar/:id", [
    check("id", "Digite id").not().isEmpty(),
    check("id", "Digite id").isMongoId(),
    validarcampos
], httpBoletos.deleteBoleto);

export default router;
