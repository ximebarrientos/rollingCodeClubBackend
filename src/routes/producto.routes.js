import { Router } from "express";
import {
  crearProducto,
  obtenerProductos,
  prueba,
  obtenerProductoPorId,
  borrarProductoPorId,
  editarProductoPorId,
} from "../controllers/producto.controllers.js";
import validacionProducto from "../middleware/validarProducto.js";
import validarIdProducto from "../middleware/validarIdProducto.js";

const router = Router();

router.route("/prueba").get(prueba);

router
.route("/")
.post(validacionProducto, crearProducto)
.get(obtenerProductos);

router
  .route("/:id")
  .get(obtenerProductoPorId)
  .delete(validarIdProducto, borrarProductoPorId)
  .put(validacionProducto, editarProductoPorId);

export default router;
