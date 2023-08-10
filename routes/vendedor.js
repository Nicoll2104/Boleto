import { Router } from "express";
import { check } from "express-validator";
import httpVendedor from "../controllers/vendedor.js";
import { get } from "mongoose";

const router= Router();

router.get("/vendedores", httpVendedor.getVendedores);

router.get("/vendedor", httpVendedor.getVendedor);

export default router