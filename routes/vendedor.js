import { Router } from "express";
import httpVendedor from "../controllers/vendedor.js";
import { get } from "mongoose";

const router= Router();

router.get("/vendedor", httpVendedor.getVendedor);

export default router