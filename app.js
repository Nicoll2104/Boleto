import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
import bus from "./routes/bus.js";

mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => console.log("Connected to MongoDB"))

const app = express()
app.use(express.json())
app.use(    "/api/bus"  ,   bus)
//git pull
//git commit -m "nombre"
//git push

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })