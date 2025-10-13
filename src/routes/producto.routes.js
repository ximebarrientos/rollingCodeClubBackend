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
import upload from "../helpers/upload.js";
import errorMulter from "../middleware/errorMulter.js";

const router = Router();

router.route("/prueba").get(prueba);

router
.route("/")
.post([upload.single('imagen'), errorMulter, validacionProducto], crearProducto)
.get(obtenerProductos);

router
  .route("/:id")
  .get(validarIdProducto, obtenerProductoPorId)
  .delete(validarIdProducto, borrarProductoPorId)
  .put([validarIdProducto, upload.single('imagen'), errorMulter, validacionProducto], editarProductoPorId);

export default router;
