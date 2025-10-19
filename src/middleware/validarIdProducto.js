import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarIdProducto = [
  param("id")
    .isMongoId()
    .withMessage("El id del producto no es un id válido de mongodb"),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarIdProducto;