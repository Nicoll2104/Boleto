import { Router } from "express";
import httpConductor from "../controllers/conductor.js";

const router = Router();

router.get("/conductor", httpConductor.getConductor);

export default router;
