import { Router } from "express";
import { borrarCanchaPorID, crearCancha, editarCanchaPorID, obtenerCanchaPorId, obtenerCanchas, prueba } from "../controllers/cancha.controllers.js";
import validacionCancha from "../middleware/validarCancha.js";

const router = Router();

router.route("/prueba").get(prueba);
router.route("/").post(validacionCancha,crearCancha).get(obtenerCanchas);
router.route("/:id").get(obtenerCanchaPorId).delete(borrarCanchaPorID).put(validacionCancha,editarCanchaPorID)

export default router;