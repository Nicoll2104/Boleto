import { Router } from "express";
import {check} from "express-validator"
import httpBoletos from "../controllers/boleto.js";
import { validarcampos } from "../middlewares/validarcampos.js";

const router = Router();

router.get("/boleto", httpBoletos.getboletos);

router.post("/agregar",[
 check('fecha_venta',"La fecha de venta es obligatoria").not().isEmpty(),
 check('hora_venta',"La hora de venta es obligatoria").not().isEmpty(),
 check('fecha_salida', " La fecha de salida es obligatoria").not().isEmpty(),
 check('hora_salida', "La hora de salida es obligatoria").not().isEmpty(),
 check('Precio', "El precio es obligatorio").not().isEmpty(),
 check('cliente', "El cliente es obligatorio").not().isEmpty( ),
 check('bus', "El bus es obligatorio").not().isEmpty(),
 check('ruta',"La ruta es obligatoria").not().isEmpty(),
 check('conductor', "El conductor es obligatorio").not().isEmpty(),
 check('vendedor', "El vendedor es obligatorio").not().isEmpty(),
validarcampos
], httpBoletos.postBoletos);

router.delete("/eliminar/:cedula", httpBoletos.deleteBoleto);

export default router;