import subirImagenCloudinary from "../helpers/cloudinaryUploader.js";
import Cancha from "../models/cancha.js";

export const crearCancha = async (req, res) => {
  try {
    let imagenUrl = "";

    const archivoImagen = req.files?.find(
      (f) => f.fieldname === "imagen" || f.fieldname === "imagenCancha"
    );

    if (archivoImagen) {
      const resultado = await subirImagenCloudinary(archivoImagen.buffer);
      imagenUrl = resultado.secure_url;
    } else {
      imagenUrl =
        "https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg";
    }

    const bodyNormalizado = { ...req.body };
    if (
      bodyNormalizado.horariosCancha &&
      typeof bodyNormalizado.horariosCancha === "string"
    ) {
      bodyNormalizado.horariosCancha = bodyNormalizado.horariosCancha
        .split(",")
        .map((h) => h.trim());
    }

    const canchaNueva = new Cancha({
      ...bodyNormalizado,
      imagenCancha: imagenUrl,
    });

    await canchaNueva.save();
    res.status(201).json({
      mensaje: "Cancha creada con éxito",
      cancha: canchaNueva,
    });
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
    res.status(200).json({ mensaje: "Cancha eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la cancha" });
  }
};

export const editarCanchaPorID = async (req, res) => {
  try {
    const canchaBuscada = await Cancha.findById(req.params.id);
    if (!canchaBuscada) {
      return res
        .status(404)
        .json({ mensaje: "Cancha no encontrada para editar" });
    }

    let imagenUrl = canchaBuscada.imagenCancha;

    const archivoImagen = req.files?.find(
      (f) => f.fieldname === "imagen" || f.fieldname === "imagenCancha"
    );

    if (archivoImagen) {
      const resultado = await subirImagenCloudinary(archivoImagen.buffer);
      imagenUrl = resultado.secure_url;
    }

    const bodyNormalizado = { ...req.body };
    if (
      bodyNormalizado.horariosCancha &&
      typeof bodyNormalizado.horariosCancha === "string"
    ) {
      bodyNormalizado.horariosCancha = bodyNormalizado.horariosCancha
        .split(",")
        .map((h) => h.trim());
    }

    const canchaEditada = await Cancha.findByIdAndUpdate(
      req.params.id,
      {
        ...bodyNormalizado,
        imagenCancha: imagenUrl,
      },
      { new: true }
    );

    res.status(200).json({
      mensaje: "Cancha editada con éxito",
      cancha: canchaEditada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar la cancha por ID" });
  }
};
