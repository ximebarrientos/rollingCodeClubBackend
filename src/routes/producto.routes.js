import { Router } from "express";
import { crearProducto, obtenerProductos, prueba, obtenerProductoPorId } from "../controllers/producto.controllers.js";

const router = Router();

router.route("/prueba").get(prueba);
router.route("/").post(crearProducto).get(obtenerProductos);
router.route("/:id").get(obtenerProductoPorId);

export default router;