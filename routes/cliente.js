import { Router } from "express";
import { check } from "express-validator";
import httpClientes from "../controllers/cliente.js";
import { validarcampos } from "../middlewares/validarcampos.js";

const router = Router();
router.get("/cliente", httpClientes.getClientes);

router.get("/:cedula", httpClientes.getClientesCedula);

router.post("/agregar",[
    check('nombre', "el nombre es obligatorio").not().isEmpty(),
    check('nombre', "minimo 5 caracteres").isLength({ min: 5, max: 50 }),
validarcampos
],httpClientes.postClientes);

router.put("/modificar/:cedula", httpClientes.putClientes)

router.delete("/eliminar/:cedula", httpClientes.deleteClientes); 

export default router;
