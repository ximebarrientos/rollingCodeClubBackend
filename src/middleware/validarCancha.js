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
      const canchaExistente = await Cancha.findOne({
        nombreCancha: valor,
      });
      //si no hay una cancha con el nombre solicitado entonces si puedo crearla
      if (!canchaExistente) {
        return true;
      }
      //si estoy editando una cancha entonces verifico los id de los productos, si es el mismo, esta todo ok
      if (req.params.id && req.params.id === canchaExistente._id.toString()) {
        return true;
      }
      throw new Error("Ya existe una cancha con ese nombre");
    }),
  body("categoriaCancha")
    .notEmpty()
    .withMessage("La categoria de la cancha es obligatoria")
    .isIn([
      "Fútbol 7 techada",
      "Fútbol 7 descubierta",
      "Fútbol 5 techada",
      "Fútbol 5 descubierta",
    ])
    .withMessage(
      "La categoria de la cancha no es válida, debe ser una de las siguientes opciones: Fútbol 7 techada, Fútbol 7 descubierta, Fútbol 5 techada, Fútbol 5 descubierta"
    ),
  body("precioCancha")
    .notEmpty()
    .withMessage("El precio de la cancha es obligatorio")
    .isNumeric()
    .withMessage("El precio de la cancha debe ser un número")
    .custom((valor) => {
      if (valor > 1000 && valor < 1000000) {
        return true;
      } else {
        throw new Error(
          "El precio de la cancha debe estar entre 1000 y 1000000"
        );
      }
    }),
  body("horariosCancha")
    .notEmpty()
    .withMessage("El horario de la cancha es obligatorio")
    .isIn(["18:30-20:00", "20:00-21:30", "21:30-23:00", "23:30-00:30"])
    .withMessage(
      "El horario de la cancha no es válido, debe ser una de las siguientes opciones: 18:30-20:00, 20:00-21:30, 21:30-23:00, 23:30-00:30"
    ),
  body("descripcionCancha")
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isLength({ min: 5, max: 250 })
    .withMessage("La descripcion debe tener entre 5 y 250 caracteres"),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];
export default validacionCancha;
