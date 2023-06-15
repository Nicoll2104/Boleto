import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => console.log("Connected to MongoDB"))

const app = express()
app.use(express.json())
//git pull
//git commit -m "nombre"
//git push

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })