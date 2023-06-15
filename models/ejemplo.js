/* import mongoose from "mongoose";
import {check} from "express-validator"

Persona:{type:mongoose.Schema.Types.ObjectId,ref:"Personas"}//este es um mongoid

//esto se hace en router
router.get('/verArt/:codigo',[
    check('nombre',"el nombre es onligatorio").not().isEmpty(),//si esta vacio
    check('nombre',"minimo 8 caracteres").isLength({min: 8,max:50}),
    //check("cedula","cedula verificada").custom()pendiente
    check("nombrecampo").isMongoId()
] , httpArticulos.getArticuloCodigo) */

/*  import persona from "../models/Personas.js"

postPersona:async(req, res)=>{
    try{
    const {cedula}= 
    const persona = new personas ({nombre, edad})
    persona.save()

    res.json({persona})
    }catch (error){
        res.json(400).json((error))
    }
    
    deletePersona:async(req, res)=>{
    const {cedula}=req.params
    const persona = await Persona.findOneAndDelete
    //const persona= await Persona.deleteMany
    res.json ({persona})
}
} */


