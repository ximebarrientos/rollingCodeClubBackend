import Cancha from "../models/cancha.js"



export const prueba= (req, res) => {
    res.status(200)
    res.send("Mensaje desde el controlador de canchas")
}

export const crearCancha= async(req, res) => {
    try {
        const canchaNueva= new Cancha(req.body);
        await canchaNueva.save();
        res.status(201).json({mensaje:"Cancha creada con exito"})
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje:"Error al crear la cancha"})
    }
}

export const obtenerCanchas= async(req, res) => {
    try {
        const listaCanchas= await Cancha.find();
        res.status(200).json(listaCanchas)
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje:"Error al obtener las canchas"})
    }
}