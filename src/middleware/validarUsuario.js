import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Usuario from "../models/usuario.js";

const validarUsuario = [
  body("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ min: 4, max: 30 })
    .withMessage("El nombre de usuario debe tener entre 4 y 30 caracteres.")
    .matches(/^[\w]+$/)
    .withMessage(
      "El nombre de usuario solo puede contener letras, números y guiones bajos (_)."
    )
    .custom(async (valor, { req }) => {
      const usuarioExistente = await Usuario.findOne({
        nombreUsuario: valor,
      });
      if (!usuarioExistente) {
        return true;
      }

      if (req.params.id && req.params.id === usuarioExistente._id.toString()) {
        return true;
      }

      throw new Error("Ya existe un usuario con este nombre de usuario.");
    }),

  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres."),

  body("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ min: 3, max: 50 })
    .withMessage("El apellido debe tener entre 3 y 50 caracteres."),

  body("fechaNacimiento")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria.")
    .isISO8601()
    .toDate()
    .withMessage(
      "El formato de fecha de nacimiento no es válido (use YYYY-MM-DD)."
    ),

  body("genero")
    .notEmpty()
    .withMessage("El género/sexo es obligatorio.")
    .isIn(["Masculino", "Femenino", "No Binario", "Prefiero no decir"])
    .withMessage("El género/sexo seleccionado no es una opción válida."),

  body("celular")
    .notEmpty()
    .withMessage("El número de celular es obligatorio.")
    .isLength({ min: 8, max: 20 })
    .withMessage("El celular debe tener entre 8 y 20 dígitos.")
    .matches(/^\d+$/)
    .withMessage("El celular solo puede contener dígitos numéricos (0-9).")
    .custom(async (valor, { req }) => {
      const usuarioExistente = await Usuario.findOne({
        celular: valor,
      });

      if (!usuarioExistente) {
        return true;
      }
      if (req.params.id && req.params.id === usuarioExistente._id.toString()) {
        return true;
      }
      throw new Error("Ya existe un usuario con este número de celular.");
    }),

  body("correoElectronico")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isEmail()
    .withMessage("El formato del correo electrónico es inválido.")
    .custom(async (valor, { req }) => {
      const usuarioExistente = await Usuario.findOne({
        correoElectronico: valor.toLowerCase(),
      });

      if (!usuarioExistente) {
        return true;
      }
      if (req.params.id && req.params.id === usuarioExistente._id.toString()) {
        return true;
      }
      throw new Error(
        "Ya existe un usuario con esta dirección de correo electrónico."
      );
    }),

  body("password")
    .custom((value, { req }) => {
      if (req.method === "PUT" && !value) {
        return true;
      }

      if (!value) {
        throw new Error("La contraseña es obligatoria.");
      }

      return true;
    })
    .matches(
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
    )
    .withMessage(
      "El password debe tener entre 8 y 16 caracteres, incluir al menos un número, una letra mayúscula, una letra minúscula y un carácter especial"
    ),
    (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarUsuario;
