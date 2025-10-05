import { Router } from "express";
import { crearProducto, obtenerProductos, prueba } from "../controllers/producto.controllers.js";

const router = Router();

router.route("/prueba").get(prueba);
router.route("/").post(crearProducto).get(obtenerProductos);

export default router;