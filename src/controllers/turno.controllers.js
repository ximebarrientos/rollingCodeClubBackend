import Turno from "../models/turno.js";
import Cancha from "../models/cancha.js";

export const crearTurno = async (req, res) => {
  try {
    const { canchaId, usuarioId, usuarioNombre, fecha, horario } = req.body;

    // verificar que la cancha existe
    const cancha = await Cancha.findById(canchaId);
    if (!cancha) {
      return res.status(404).json({ mensaje: "Cancha no encontrada" });
    }

    // verificar que el horario esté disponible para esta cancha
    if (!cancha.horariosCancha.includes(horario)) {
      return res.status(400).json({
        mensaje: `El horario ${horario} no está disponible para esta cancha. Horarios disponibles: ${cancha.horariosCancha.join(", ")}`
      });
    }

    // verificar que la fecha sea futura (al menos hoy)
    const fechaSolicitada = new Date(fecha);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // solo fecha sin hora

    if (fechaSolicitada < fechaActual) {
      return res.status(400).json({ mensaje: "No se pueden reservar turnos para fechas pasadas" });
    }

    // el indice unico en el modelo se encarga de evitar duplicados
    // si ya existe un turno para cancha, fecha y horario, mongoose lanzará un error de validación

    const turnoNuevo = new Turno({ canchaId, usuarioId, nombreUsuario: usuarioNombre, fecha: fechaSolicitada, horario });
    await turnoNuevo.save();

    res.status(201).json({ mensaje: "Turno reservado con éxito", turno: turnoNuevo });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      // error de duplicado por indice unico
      return res.status(409).json({ mensaje: "Ya existe un turno reservado para esta cancha en la fecha y horario especificados" });
    }

    res.status(500).json({ mensaje: "Error al reservar el turno" });
  }
};

export const obtenerTurnos = async (req, res) => {
  try {
    const listaTurnos = await Turno.find().populate('canchaId', 'nombreCancha categoriaCancha');
    res.status(200).json(listaTurnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los turnos" });
  }
};

export const obtenerTurnoPorId = async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id).populate('canchaId', 'nombreCancha categoriaCancha');
    if (!turno) {
      return res.status(404).json({ mensaje: "Turno no encontrado" });
    }
    res.status(200).json(turno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el turno por ID" });
  }
};

export const borrarTurnoPorID = async (req, res) => {
  try {
    const turnoEliminado = await Turno.findByIdAndDelete(req.params.id);
    if (!turnoEliminado) {
      return res.status(404).json({ mensaje: "Turno no encontrado para eliminar" });
    }
    res.status(200).json({ mensaje: "Turno eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el turno" });
  }
};
