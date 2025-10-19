import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Cancha from "../models/cancha.js";

const validacionCancha = [
  body("nombreCancha")
    .notEmpty()
    .withMessage("El nombre de la cancha es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre de la cancha debe tener entre 2 y 100 caracteres")
    .custom(async (valor, { req }) => {
      const canchaExistente = await Cancha.findOne({ nombreCancha: valor });
      if (!canchaExistente) return true;
      if (req.params.id && req.params.id === canchaExistente._id.toString())
        return true;
      throw new Error("Ya existe una cancha con ese nombre");
    }),
  body("categoriaCancha")
    .notEmpty()
    .withMessage("La categoría de la cancha es obligatoria")
    .isIn([
      "Fútbol 7 techada",
      "Fútbol 7 descubierta",
      "Fútbol 5 techada",
      "Fútbol 5 descubierta",
    ])
    .withMessage(
      "Debe ser una de las siguientes opciones: Fútbol 7 techada, Fútbol 7 descubierta, Fútbol 5 techada o Fútbol 5 descubierta"
    ),
  body("precioCancha")
    .notEmpty()
    .withMessage("El precio de la cancha es obligatorio")
    .isNumeric()
    .withMessage("El precio de la cancha debe ser un número")
    .custom((valor) => {
      if (valor >= 1000 && valor <= 1000000) return true;
      throw new Error("El precio de la cancha debe estar entre 1000 y 1.000.000");
    }),
  body("horariosCancha")
    .notEmpty()
    .withMessage("Debe especificar al menos un horario")
    .custom((valor) => {
      const horariosPermitidos = [
        "18:30-20:00",
        "20:00-21:30",
        "21:30-23:00",
        "23:30-00:30",
      ];

      if (typeof valor === "string") {
        const lista = valor.split(",").map((h) => h.trim());
        const todosValidos = lista.every((h) => horariosPermitidos.includes(h));
        if (!todosValidos)
          throw new Error("Uno o más horarios no son válidos");
        return true;
      }

      if (Array.isArray(valor)) {
        const todosValidos = valor.every((h) => horariosPermitidos.includes(h));
        if (!todosValidos)
          throw new Error("Uno o más horarios no son válidos");
        return true;
      }

      throw new Error("Formato de horarios inválido");
    }),

  body("descripcionCancha")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 5, max: 250 })
    .withMessage("La descripción debe tener entre 5 y 250 caracteres"),

  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionCancha;
