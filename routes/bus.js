import { Router } from "express";
import {check} from "express-validator"
import httpbus from "../controllers/bus.js"

const router=new Router()

router.get('/ver', httpbus.getbus  )

router.post('/agregar', httpbus.postBus )

router.put('/modificar/:placa', httpbus.putbus)









export default router;