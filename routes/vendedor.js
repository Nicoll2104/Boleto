import { Router } from "express";
import { check } from "express-validator";
import httpVendedor from "../controllers/vendedor.js";
import { validarcampos } from "../middlewares/validarcampos.js";
import {validarJWT} from "../middlewares/validar.js"
import helpersVendedor from "../helpers/hp_vendedor.js";

const router= Router();

router.get("/vendedores", httpVendedor.getVendedores);

router.get("/vendedor/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpVendedor.getVendedor);

router.post("/agregar",[
    check('cedula', 'La cédula es obligatoria y debe tener entre 7 y 10 caracteres').isLength({ min: 7, max: 10 }),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio y debe tener minimo 9 números').isLength({ min: 9 }), 
    check("usuario", "El usuario es obligatorio y debe tener minimo 5 caracteres").isLength({ min:5}),
    check("contrasena", "La contrasena es obligatoria y debe tener minimo 8 caracteres").isLength({min:8}),
    check('cedula').custom(helpersVendedor.validarCedulaUnica),

    validarcampos
], httpVendedor.postVendedor);

router.put("/modificar/:id",[
    check('cedula', 'La cédula es obligatoria y debe tener entre 7 y 10 caracteres').isLength({ min: 7, max: 10 }),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio y debe tener minimo 9 números').isLength({ min: 9 }), 
    check("usuario", "El usuario es obligatorio y debe tener minimo 5 caracteres").isLength({ min:5}),
    check("contrasena", "La contrasena es obligatoria y debe tener minimo 8 caracteres").isLength({min:8}),
    check('cedula').custom(helpersVendedor.validarCedulaUnica),

    validarcampos
], httpVendedor.putVendedor);

router.put("/activar/:id", httpVendedor.putActivar);

router.put("/inactivar/:id",httpVendedor.putInactivar);


router.post('/login',[
    check("usuario","Digite su usuario").not().isEmpty(),
    check("contrasena","Digite su contraseña").not().isEmpty(),
],httpVendedor.login);

router.delete('/eliminar/:id',httpVendedor.deletevendedor);

export default router