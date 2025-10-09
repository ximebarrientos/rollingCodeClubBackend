import Usuario from "../models/usuario.js";

export const pruebaUsuario = (req, res) => {
  res.status(200).send("Mensaje desde el controlador de usuarios");
};

export const registrarUsuario = async (req, res) => {
  try {
    const usuarioNuevo = new Usuario(req.body);

    await usuarioNuevo.save();

    res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: {
        id: usuarioNuevo._id,
        nombreUsuario: usuarioNuevo.nombreUsuario,
        correoElectronico: usuarioNuevo.correoElectronico,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ mensaje: "El email o nombre de usuario ya está registrado." });
    }
    res
      .status(500)
      .json({ mensaje: "Error interno al intentar registrar el usuario." });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const listaUsuarios = await Usuario.find({}).select("-password");

    res.status(200).json(listaUsuarios);
  } catch (error) {
    console.error("Error en obtenerUsuarios:", error);
    res.status(500).json({
      mensaje: "Error al obtener la lista de usuarios",
    });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id).select(
      "-password"
    );

    if (!usuarioBuscado) {
      return res.status(404).json({ mensaje: "El usuario no existe." });
    }
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.error("Error en obtenerUsuarioPorId:", error);
    res.status(500).json({ mensaje: "Error al obtener el usuario por el Id." });
  }
};

export const editarUsuarioPorId = async (req, res) => {
  try {
    let datosAActualizar = req.body;

    const usuarioEditado = await Usuario.findByIdAndUpdate(
      req.params.id,
      datosAActualizar,
      { new: true, runValidators: true }
    ).select("-password");

    if (!usuarioEditado) {
      return res.status(404).json({ mensaje: "El usuario no existe." });
    }

    res.status(200).json({
      mensaje: "Usuario editado con éxito.",
      usuario: usuarioEditado,
    });
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.status(500).json({ mensaje: "Error al editar el usuario por el Id." });
  }
};

export const borrarUsuarioPorId = async (req, res) => {
  try {
    const usuarioBorrado = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuarioBorrado) {
      return res.status(404).json({ mensaje: "El usuario no existe." });
    }
    res.status(200).json({ mensaje: "Usuario borrado con éxito." });
  } catch (error) {
    console.error("Error al borrar usuario:", error);
    res.status(500).json({ mensaje: "Error al borrar el usuario por el Id." });
  }
};
