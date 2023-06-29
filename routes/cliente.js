import { Router } from "express";
import httpClientes from "../controllers/cliente.js";

const router = Router();
router.get("/cliente", httpClientes.getClientes);

export default router;