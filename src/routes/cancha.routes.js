import { Router } from "express";
import { borrarCanchaPorID, crearCancha, editarCanchaPorID, obtenerCanchaPorId, obtenerCanchas, prueba } from "../controllers/cancha.controllers.js";
import validacionCancha from "../middleware/validarCancha.js";
import verificarToken from "../middleware/verificarToken.js";
import validarIdCancha from "../middleware/validarIdCancha.js";

const router = Router();

router.route("/prueba").get(prueba);
router.route("/").post([verificarToken,validacionCancha],crearCancha).get(obtenerCanchas);
router.route("/:id").get(validarIdCancha,obtenerCanchaPorId).delete([verificarToken,validarIdCancha],borrarCanchaPorID).put([verificarToken, validarIdCancha,validacionCancha],editarCanchaPorID)

export default router;