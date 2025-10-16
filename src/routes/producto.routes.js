import { Router } from "express";
import {
  crearProducto,
  obtenerProductos,
  prueba,
  obtenerProductoPorId,
  borrarProductoPorId,
  editarProductoPorId,
  productosPaginados
} from "../controllers/producto.controllers.js";
import validacionProducto from "../middleware/validarProducto.js";
import validarIdProducto from "../middleware/validarIdProducto.js";
import upload from "../helpers/upload.js";
import errorMulter from "../middleware/errorMulter.js";
import verificarToken from "../middleware/verificarToken.js";

const router = Router();

router.route("/prueba").get(prueba);

router
.route("/")
.post([verificarToken,upload, errorMulter, validacionProducto], crearProducto)
.get(obtenerProductos);

router
.route("/paginacion")
.get(productosPaginados)

router
  .route("/:id")
  .get(validarIdProducto, obtenerProductoPorId)
  .delete([verificarToken,validarIdProducto], borrarProductoPorId)
  .put([verificarToken,validarIdProducto, upload, errorMulter, validacionProducto], editarProductoPorId);

export default router;
