import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarIdCancha = [
  param("id")
    .isMongoId()
    .withMessage("El id de la cancha no es un id válido de mongodb"),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarIdCancha;