import { Router } from "express";
import { check } from "express-validator";
import httpRutas from "../controllers/ruta.js";
import { validarcampos } from "../middlewares/validarcampos.js";

const router = Router();
 
router.get("/ver", httpRutas.getRuta);

router.get("/ruta/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpRutas.getRutaid);

router.post("/agregar",[
    check('origen',"El origen es obligatorio").not().isEmpty(),
    check('destino',"El destino es obligatorio").not().isEmpty(),
    check('horarios',"Los horarios son obligatorio").not().isEmpty(),
    check('distancia',"La distancia es obligatoria").not().isEmpty(),
    check('duracion',"La duracion es obligatoria").not().isEmpty(),
    check('fecha',"La fecha es obligatoria").not().isEmpty(),
], httpRutas.postRuta);

router.put("/modificar/:id",[
    check('origen',"El origen es obligatorio").not().isEmpty(),
    check('destino',"El destino es obligatorio").not().isEmpty(),
    check('horarios',"Los horarios son obligatorio").not().isEmpty(),
    check('distancia',"La distancia es obligatoria").not().isEmpty(),
    check('duracion',"La duracion es obligatoria").not().isEmpty(),
    check('fecha',"La fecha es obligatoria").not().isEmpty(),
    validarcampos
], httpRutas.putRuta);

router.delete("/eliminar/:id", httpRutas.deleteRuta);

router.put("/inactivar/:id", httpRutas.putInactivar);

router.put("/activar/:id", httpRutas.putActivar);

export default router;