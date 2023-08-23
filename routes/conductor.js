import { Router } from "express";
import { check } from "express-validator";
import httpConductor from "../controllers/conductor.js";
import { validarcampos } from "../middlewares/validarcampos.js";

const router = Router();

router.get("/conductores", httpConductor.getConductores);

router.get("/conductor/:id", httpConductor.getConductor);

router.post("/agregar", [
    check('cedula',"La cedula es obligatoria y debe tener minimo 7 caracteres y maximo 10").isLength({ min: 7, max: 10 }),
    check('edad',"La edad es obligatoria").not().isEmpty(),
    check('nombre', " El nombre es obligatorio ").not().isEmpty(),
    check('apellido', "El apellido es obligatorio").not().isEmpty(),
    check('n_licencia', "El numero de licencia es obligatorio y debe tener minimo 7 caracteres y maximo 10").isLength({ min: 7, max: 10 }),
    check('direccion', "La direccion es obligatoria").not().isEmpty( ),
    check('telefono', "El telefono es obligatorio y debe tener minimo 10 caracteres").isLength({ min: 10, max: 10 }),
   validarcampos
], httpConductor.postConductor);

router.put("/modificar/:id", [
    check('cedula',"La cedula es obligatoria y debe tener minimo 7 caracteres y maximo 10").not().isEmpty(),
    check('edad',"La edad es obligatoria").not().isEmpty(),
    check('nombre', " El nombre es obligatorio y debe tener minimo 8 caracteres").not().isEmpty(),
    check('apellido', "El apellido es obligatorio y debe tener minimo 8 caracteres").not().isEmpty(),
    check('n_licencia', "El numero de licencia es obligatorio y debe tener minimo 7 caracteres y maximo 10").not().isEmpty(),
    check('direccion', "La direccion es obligatoria").not().isEmpty( ),
    check('telefono', "El telefono es obligatorio y debe tener minimo 10 caracteres").not().isEmpty(),
   validarcampos
], httpConductor.putConductor);

router.delete("/eliminar/:id", httpConductor.deleteConductor);

router.put("/inactivar/:id",httpConductor.putInactivar)

router.put("/activar/:id",httpConductor.putActivar)

export default router;
