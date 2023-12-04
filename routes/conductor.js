import { Router } from "express";
import { check } from "express-validator";
import httpConductor from "../controllers/conductor.js";
import { validarcampos } from "../middlewares/validarcampos.js";
import helpersConductor from "../helpers/hp_conductor.js";

const router = Router();

router.get("/ver", httpConductor.getConductores);

router.get("/conductor/:id", httpConductor.getConductor);

router.post("/agregar", [
    check('cedula', 'La cédula es obligatoria y debe tener entre 7 y 10 caracteres').isLength({ min: 7, max: 10 }).custom(helpersConductor.validarCedulaUnica),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('n_licencia', "El numero de licencia es obligatorio y debe tener minimo 7 caracteres y maximo 10").isLength({ min: 7, max: 10 }).custom(helpersConductor.validarN_licencia),
    check('direccion', "La direccion es obligatoria").not().isEmpty( ),
    check('telefono', 'El teléfono es obligatorio y debe tener minimo 9 números').isLength({ min: 9 }), 
    check('cedula').custom(helpersConductor.validarCedulaUnica),

   validarcampos
], httpConductor.postConductor);

router.put("/modificar/:id", [
    check('cedula', 'La cédula es obligatoria y debe tener entre 7 y 10 caracteres').isLength({ min: 7, max: 10 }).custom(helpersConductor.validarCedulaUnica),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('n_licencia', "El numero de licencia es obligatorio y debe tener minimo 7 caracteres y maximo 10").isLength({ min: 7, max: 10 }).custom(helpersConductor.validarN_licencia),
    check('direccion', "La direccion es obligatoria").not().isEmpty( ),
    check('telefono', 'El teléfono es obligatorio y debe tener minimo 9 números').isLength({ min: 9 }), 
    check('cedula').custom(helpersConductor.validarCedulaUnica),

   validarcampos
], httpConductor.postConductor);

router.delete("/eliminar/:id", httpConductor.deleteConductor);

router.put("/inactivar/:id",httpConductor.putInactivar)

router.put("/activar/:id",httpConductor.putActivar)

export default router;
