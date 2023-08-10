import { Router } from "express";
import httpRutas from "../controllers/ruta.js";

const router = Router();
 
router.get("/ver", httpRutas.getRuta);

router.get("/ruta/:id", httpRutas.getRutaid);

router.post("/agregar",httpRutas.postRuta);

router.put("/modificar/:id")

export default router;