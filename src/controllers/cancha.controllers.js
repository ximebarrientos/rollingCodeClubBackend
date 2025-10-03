import Cancha from "../models/cancha.js";

export const prueba = (req, res) => {
  res.status(200);
  res.send("Mensaje desde el controlador de canchas");
};

export const crearCancha = async (req, res) => {
  try {
    const canchaNueva = new Cancha(req.body);
    await canchaNueva.save();
    res.status(201).json({ mensaje: "Cancha creada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la cancha" });
  }
};

export const obtenerCanchas = async (req, res) => {
  try {
    const listaCanchas = await Cancha.find();
    res.status(200).json(listaCanchas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener las canchas" });
  }
};

export const obtenerCanchaPorId = async (req, res) => {
  try {
    const canchaBuscada = await Cancha.findById(req.params.id);
    if (!canchaBuscada) {
      return res.status(404).json({ mensaje: "Cancha no encontrada" });
    }
    res.status(200).json(canchaBuscada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la cancha por ID" });
  }
};

export const borrarCanchaPorID = async (req, res) => {
  try {
    const canchaEliminada = await Cancha.findByIdAndDelete(req.params.id);
    if (!canchaEliminada) {
      return res
        .status(404)
        .json({ mensaje: "Cancha no encontrada para eliminar" });
    }
    res.status(200).json({ mensaje: "Cancha eliminada con exito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la cancha" });
  }
};

export const editarCanchaPorID = async (req, res) => {
    try {
        const canchaEditada = await Cancha.findByIdAndUpdate(req.params.id, req.body)
        if(!canchaEditada){
            return res.status(404).json({mensaje: "Cancha no encontrada para editar"})
        }
        res.status(200).json({mensaje: "Cancha editada con exito"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: "Error al editar la cancha por ID"})
    }
}