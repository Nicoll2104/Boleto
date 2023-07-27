import { Router } from "express";
import httpClientes from "../controllers/cliente.js";

const router = Router();
router.get("/cliente", httpClientes.getClientes);

/* router.get("/:cedula", httpClientes.getClientesCedula); */

router.post("/agregar", httpClientes.postClientes);

export default router;