import { Router } from "express";
import httpRutas from "../controllers/ruta.js";

const router = Router();
 
router.get("/ruta", httpRutas.getRuta);

export default router;