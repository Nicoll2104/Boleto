import { Router } from "express";
import {check} from "express-validator"
import httpbus from "../controllers/bus.js"
import { validarcampos } from "../middlewares/validarcampos.js";

const router= Router();

router.get("/ver", httpbus.getBus  )

router.post("/agregar",[
    check('placa', "La placa es obligatoria y debe tener al menos 8 caracteres").isLength({ min: 5, max:6 }),
    check('modelo', "El modelo es obligatorio").not().isEmpty(),
    check('soat', "El campo SOAT es obligatorio").not().isEmpty(),
    check('n_asiento', "El número de asiento es obligatorio").not().isEmpty(),
    validarcampos
], httpbus.postBus )

router.put("/modificar/:placa", httpbus.putBus)

router.delete("/eliminar/:placa",httpbus.deleteBus)

export default router;