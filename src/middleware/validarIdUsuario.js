import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarIdUsuario = [
  param("id")
    .isMongoId()
    .withMessage("El id del usuario no es un ID válido de MongoDB."),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarIdUsuario;
