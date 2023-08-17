import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
import bus from "./routes/bus.js";
import cliente from "./routes/cliente.js";
import conductor from "./routes/conductor.js";
import ruta from "./routes/ruta.js";
import vendedor from "./routes/vendedor.js";
import boleto from "./routes/boleto.js";

mongoose.connect(process.env.mongoDB)
.then(() => console.log("Connected to MongoDB"))

const app = express()
app.use(express.json())
app.use( "/api/bus"  ,   bus);
app.use( "/api/cliente", cliente);
app.use( "/api/conductor", conductor);
app.use( "/api/ruta", ruta);
app.use( "/api/vendedor", vendedor);
app.use( "/api/boleto", boleto)

//git pull
//git commit -m "nombre"
//git push

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })