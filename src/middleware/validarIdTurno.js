import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarIdTurno = [
  param("id")
    .isMongoId()
    .withMessage("El id del turno no es un ID válido de MongoDB."),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarIdTurno;
