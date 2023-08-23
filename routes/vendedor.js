import { Router } from "express";
import { check } from "express-validator";
import httpVendedor from "../controllers/vendedor.js";
import { validarcampos } from "../middlewares/validarcampos.js";
import {validarJWT} from "../middlewares/validar.js"

const router= Router();

router.get("/vendedores", httpVendedor.getVendedores);

router.get("/vendedor/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    validarcampos
], httpVendedor.getVendedor);

router.post("/agregar",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("cedula", "La cedula es obligatoria").not().isEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("usuario", "El usuario es obligatorio").not().isEmpty(),
    check("contrasena", "La contrasena es obligatoria").not().isEmpty(),
    validarcampos
], httpVendedor.postVendedor);

router.put("/activar:id",[
    check("id","Digite ID").not().isEmpty(),
    check("id","Digite ID").isMongoId(),
    validarJWT
], httpVendedor.putActivar);

router.put("/inactivar:id",[
    check("id","Digite ID").not().isEmpty(),
    check("id","Digite ID").isMongoId(),
    validarcampos
], httpVendedor.putInactivar);

router.post('/login', httpVendedor.login);

router.delete('/eliminar/:id',httpVendedor.deletevendedor);

export default router