import { Router } from "express";
import {
  borrarTurnoPorID,
  crearTurno,
  obtenerTurnoPorId,
  obtenerTurnos,
} from "../controllers/turno.controllers.js";
import validacionTurno from "../middleware/validarTurno.js";
import verificarToken from "../middleware/verificarToken.js";
import validarIdTurno from "../middleware/validarIdTurno.js";

const router = Router();

router
  .route("/")
  .post([verificarToken,validacionTurno], crearTurno)
  .get(obtenerTurnos);
router
  .route("/:id")
  .get(validarIdTurno,obtenerTurnoPorId)
  .delete([verificarToken,validarIdTurno],borrarTurnoPorID);

export default router;
