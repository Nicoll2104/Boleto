import { Router } from "express";
import { check } from "express-validator";
import httpClientes from "../controllers/cliente.js";

const router = Router();
router.get("/cliente", httpClientes.getClientes);

router.get("/:cedula", httpClientes.getClientesCedula);

router.post("/agregar",[
    check('nombre', "el nombre es obligatorio").not().isEmpty(),
    check('nombre', "minimo 8 caracteres").isLength({ min: 5, max: 50 })
], httpClientes.postClientes);

router.delete("/eliminar/:cedula", httpClientes.deleteClientes); 

export default router;
