import { Router } from "express";
import { crearCancha, obtenerCanchas, prueba } from "../controllers/cancha.controllers.js";

const router = Router();

router.route("/prueba").get(prueba);
router.route("/").post(crearCancha).get(obtenerCanchas);

export default router;