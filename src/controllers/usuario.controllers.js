import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registrarUsuario = async (req, res) => {
  try {
    const { password, ...resto } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuarioNuevo = new Usuario({
      ...resto,
      password: hashedPassword,
    });

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
    const { password, ...datosAActualizar } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      datosAActualizar.password = await bcrypt.hash(password, salt);
    }

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
    const idUsuario = req.params.id;

    const usuarioAEliminar = await Usuario.findById(idUsuario);

    if (!usuarioAEliminar) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado para borrar.",
      });
    }

    if (usuarioAEliminar.rol === "administrador") {
      return res.status(403).json({
        mensaje: "Acción prohibida: No se puede eliminar a otro administrador.",
      });
    }

    const usuarioBorrado = await Usuario.findByIdAndDelete(idUsuario);

    res.status(200).json({
      mensaje: `Usuario ${usuarioBorrado.nombreUsuario} eliminado correctamente.`,
      usuario: usuarioBorrado,
    });
  } catch (error) {
    console.error("Error al intentar borrar el usuario:", error);
    res.status(500).json({
      mensaje:
        "Error interno del servidor al procesar la solicitud de borrado.",
    });
  }
};

export const alternarEstadoUsuario = async (req, res) => {
  try {
    const idUsuario = req.params.id;
    const { estado: nuevoEstado } = req.body;

    const usuarioAEditar = await Usuario.findById(idUsuario);

    if (!usuarioAEditar) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado.",
      });
    }

    if (usuarioAEditar.rol === "administrador") {
      return res.status(403).json({
        mensaje:
          "Acción prohibida: No se puede cambiar el estado de otro administrador.",
      });
    }

    if (
      !nuevoEstado ||
      (nuevoEstado !== "activo" && nuevoEstado !== "bloqueado")
    ) {
      return res.status(400).json({
        mensaje:
          'El nuevo estado es inválido. Debe ser "activo" o "bloqueado".',
      });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      idUsuario,
      { estado: nuevoEstado },
      { new: true }
    );

    res.status(200).json({
      mensaje: `El estado del usuario ${usuarioActualizado.nombreUsuario} fue actualizado a ${nuevoEstado}.`,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al intentar alternar el estado del usuario:", error);
    res.status(500).json({
      mensaje:
        "Error interno del servidor al procesar la solicitud de cambio de estado.",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { correoElectronico, password } = req.body;

    const usuarioEncontrado = await Usuario.findOne({ correoElectronico });
    const token = jwt.sign(
      {
        id: usuarioEncontrado._id,
        rol: usuarioEncontrado.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso.",
      usuario: {
        id: usuarioEncontrado._id,
        nombreUsuario: usuarioEncontrado.nombreUsuario,
        rol: usuarioEncontrado.rol,

        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        fechaNacimiento: usuarioEncontrado.fechaNacimiento,
        genero: usuarioEncontrado.genero,
        celular: usuarioEncontrado.celular,
        correoElectronico: usuarioEncontrado.correoElectronico,
      },
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res
      .status(500)
      .json({ mensaje: "Error interno al intentar iniciar sesión." });
  }
};
