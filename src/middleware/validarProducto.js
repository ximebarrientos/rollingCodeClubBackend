import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Producto from "../models/producto.js";

const validacionProducto = [
  body("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre del producto debe tener entre 3 y 100 caracteres.")
    .custom(async (valor, {req}) => {
      const productoExistente = await Producto.findOne({
        nombreProducto: valor,
      });
      if (!productoExistente) {
        return true;
      }
      if (req.params.id && req.params.id === productoExistente._id.toString()) {
        return true;
      }
      throw new Error(
          "Ya existe un producto con este nombre."
        );
    }),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio.")
    .isNumeric()
    .withMessage("El precio debe ser un número.")
    .custom((valor) => {
      if (valor >= 50 || valor <= 1000000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre 50 y 1.000.000");
      }
    }),

  body("categoria")
    .notEmpty()
    .withMessage("La categoría es obligatoria.")
    .isIn(["Indumentaria", "Accesorios"])
    .withMessage(
      "La categoría no es válida. Debe ser 'Indumentaria' o 'Accesorios'."
    ),

  body("subcategoria").custom((valor, { req }) => {
    const categoria = req.body.categoria;

    const subcategoriasIndumentaria = ["Botines", "Camisetas", "Shorts"];
    const subcategoriasAccesorios = ["Kits de entrenamiento", "Pelotas"];

    if (
      categoria === "Indumentaria" &&
      !subcategoriasIndumentaria.includes(valor)
    ) {
      throw new Error(
        "La subcategoría elegida no corresponde a Indumentaria. Use Botines, Camisetas o Shorts."
      );
    }

    if (
      categoria === "Accesorios" &&
      !subcategoriasAccesorios.includes(valor)
    ) {
      throw new Error(
        "La subcategoría elegida no corresponde a Accesorios. Use Kits de entrenamiento o Pelotas."
      );
    }
    return true;
  }),

  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria.")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe tener entre 10 y 500 caracteres."),

  body("talles")
    .optional()
    .custom((valor, { req }) => {
      const subcategoria = req.body.subcategoria;
      if (["Camisetas", "Shorts"].includes(subcategoria)) {
        if (!Array.isArray(valor)) {
          throw new Error("Los talles deben ser un arreglo (array).");
        }
        if (valor.length === 0) {
          throw new Error(
            "Este producto debe incluir al menos un talle disponible."
          );
        }
      } else if (valor && valor.length > 0) {
        throw new Error("No se deben incluir talles en esta subcategoría.");
      }
      return true;
    }),

  body("numeros")
    .optional()
    .custom((valor, { req }) => {
      const subcategoria = req.body.subcategoria;
      if (subcategoria === "Botines") {
        if (!Array.isArray(valor)) {
          throw new Error("Los números deben ser un arreglo (array).");
        }
        if (valor.length === 0) {
          throw new Error(
            "Este producto debe incluir al menos un número disponible."
          );
        }
      } else if (valor && valor.length > 0) {
        throw new Error("No se deben incluir números en esta subcategoría.");
      }
      return true;
    }),

  // Validación global para asegurar que talles o números estén presentes cuando corresponde
  body().custom((_, { req }) => {
    const { categoria, subcategoria, talles, numeros } = req.body;

    if (categoria === "Indumentaria") {
      if (
        ["Camisetas", "Shorts"].includes(subcategoria) &&
        (!talles || talles.length === 0)
      ) {
        throw new Error(
          "Los productos de Camisetas o Shorts deben incluir al menos un talle."
        );
      }

      if (subcategoria === "Botines" && (!numeros || numeros.length === 0)) {
        throw new Error(
          "Los Botines deben incluir al menos un número disponible."
        );
      }
    }

    return true;
  }),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionProducto;
