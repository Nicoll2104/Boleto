import { Router } from "express";
import { check } from "express-validator";
import httpRutas from "../controllers/ruta.js";
import { validarcampos } from "../middlewares/validarcampos.js";

const router = Router();
 
router.get("/ver", httpRutas.getRuta);

router.get("/ruta/:id", httpRutas.getRutaid);

router.post("/agregar", httpRutas.postRuta);

router.put("/modificar/:id", httpRutas.putRuta);

router.delete("/eliminar/:id", httpRutas.deleteRuta);

router.put("/inactivar/:id", httpRutas.putInactivar);

router.put("/activar/:id", httpRutas.putActivar);

export default router;