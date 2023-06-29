import { Router } from "express";
import httpbus from "../controllers/bus.js"

const router=new Router()

router.get('/ver', httpbus.getbus  )

router.post('/agregar', httpbus.postbus )









export default router;