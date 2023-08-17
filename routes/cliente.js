import { Router } from "express";
import { check } from "express-validator";
import httpClientes from "../controllers/cliente.js";
import { validarcampos } from "../middlewares/validarcampos.js";

const router = Router();

router.get("/ver", httpClientes.getClientes);

router.get("/cliente/:id", httpClientes.getClientesid);

router.post("/agregar",[
    check('cedula', 'La cédula es obligatoria y debe tener entre 7 y 10 caracteres').isLength({ min: 7, max: 10 }),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio y debe tener al menos 10 caracteres').isLength({ min: 10, max:10 }),
    check('email', 'El email es obligatorio').isEmail(),
    check('contrasena', 'La contraseña es obligatoria y debe tener al menos 8 caracteres').isLength({ min: 8 }),
    check('maleta', 'El número de maleta es obligatorio y debe tener hasta 3 dígitos').isInt({ min: 1, max: 3 }),
validarcampos
],httpClientes.postClientes);

router.put("/modificar/:id",[
    check('telefono', 'El teléfono es obligatorio y debe tener al menos 10 caracteres').isLength({ min: 10, max:10 }),
    check('email', 'El email es obligatorio').isEmail(),
    check('contrasena', 'La contraseña es obligatoria y debe tener al menos 8 caracteres').isLength({ min: 8 }),
    validarcampos
], httpClientes.putClientes)

router.delete("/eliminar/:id", httpClientes.deleteClientes);

router.put("/inactivar/:id",httpClientes.putInactivar)

router.put("/activar/:id",httpClientes.putActivar)

export default router;