import { Router } from "express";
import { check } from "express-validator";
import httpbus from "../controllers/bus.js";
import { validarcampos } from "../middlewares/validarcampos.js";
import helpersBus from "../helpers/hp_bus.js";

const router = Router();

router.get("/ver", httpbus.getBuses);

router.get('/bus/:id', httpbus.getBus);

router.post("/agregar", [
  check('placa', "La placa es obligatoria y debe tener entre  5 y 6 caracteres").isLength({ min: 5, max: 8 }).custom(helpersBus.validarPlacaUnica),
  check('numero', "El numero es obligatorio").not().isEmpty().custom(helpersBus.validarNumeroUnica),
  check('conductor', 'El conductor es obligario').not().isEmpty(),
  check('modelo', "El modelo es obligatorio").not().isEmpty(),
  check('soat', "El campo SOAT es obligatorio").not().isEmpty(),
  check('n_asiento', "El número de asiento es obligatorio").not().isEmpty(),
  check("empresa_asignada", "Nombre de la empresa es obligatorio").not().isEmpty(),
  validarcampos
], httpbus.postBus);

router.put("/modificar/:id", [
  check('placa', "La placa es obligatoria y debe tener entre  5 y 6 caracteres").isLength({ min: 5, max: 8 }),
  check('numero', "El numero es obligatorio").not().isEmpty(),
  check('conductor', 'El conductor es obligario').not().isEmpty(),
  check('modelo', "El modelo es obligatorio").not().isEmpty(),
  check('soat', "El campo SOAT es obligatorio").not().isEmpty(),
  check('n_asiento', "El número de asiento es obligatorio").not().isEmpty(),
  check("empresa_asignada", "Nombre de la empresa es obligatorio").not().isEmpty(),
  validarcampos,
], httpbus.putBus);

router.delete("/eliminar/:id", httpbus.deleteBus);

router.put("/inactivar/:id", httpbus.putInactivar);

router.put("/activar/:id", httpbus.putActivar);

export default router;
