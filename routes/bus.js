import { Router } from "express";
import {check} from "express-validator"
import httpbus from "../controllers/bus.js"
import { validarcampos } from "../middlewares/validarcampos.js";
import { validarJWT } from "../middlewares/validar.js";

const router= Router();

router.get("/ver", httpbus.getBuses)

router.get('/bus/:id',httpbus.getBus);

router.post("/agregar",[
    check('placa', "La placa es obligatoria y debe tener al menos 5 caracteres").isLength({ min: 5, max:6 }),
    check('modelo', "El modelo es obligatorio").not().isEmpty(),
    check('soat', "El campo SOAT es obligatorio").not().isEmpty(),
    check('n_asiento', "El número de asiento es obligatorio").not().isEmpty(),
    check("empresa_asignada", "Nombre de la empresa").not().isEmpty(),
validarcampos
], httpbus.postBus )

router.put("/modificar/:id", [
    check('soat', "El campo SOAT es obligatorio").not().isEmpty(),
    check("n_asiento", "Asientos disponibles requeridos").not().isEmpty(),
    check("empresa_asignada", "Nombre de la empresa").not().isEmpty(),
    validarcampos,
    validarJWT
],httpbus.putBus)

router.delete("/eliminar/:id",httpbus.deleteBus)

router.put("/inactivar/:id",httpbus.putInactivar)

router.put("/activar/:id",httpbus.putActivar)

export default router;
