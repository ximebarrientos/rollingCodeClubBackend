import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionTurno = [
  body("canchaId")
    .notEmpty()
    .withMessage("El ID de la cancha es obligatorio")
    .isMongoId()
    .withMessage("El ID de la cancha debe ser un ObjectId válido"),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido (ISO8601)")
    .toDate(),

  body("horario")
    .notEmpty()
    .withMessage("El horario es obligatorio")
    .isIn(["18:30-20:00", "20:00-21:30", "21:30-23:00", "23:30-00:30"])
    .withMessage(
      "El horario no es válido, debe ser una de las siguientes opciones: 18:30-20:00, 20:00-21:30, 21:30-23:00, 23:30-00:30"
    ),

  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionTurno;
