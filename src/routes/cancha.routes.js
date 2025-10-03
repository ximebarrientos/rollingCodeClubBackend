import { Router } from "express";
import { borrarCanchaPorID, crearCancha, editarCanchaPorID, obtenerCanchaPorId, obtenerCanchas, prueba } from "../controllers/cancha.controllers.js";

const router = Router();

router.route("/prueba").get(prueba);
router.route("/").post(crearCancha).get(obtenerCanchas);
router.route("/:id").get(obtenerCanchaPorId).delete(borrarCanchaPorID).put(editarCanchaPorID)

export default router;