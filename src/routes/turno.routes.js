import { Router } from "express";
import {
  borrarTurnoPorID,
  crearTurno,
  obtenerTurnoPorId,
  obtenerTurnos,
} from "../controllers/turno.controllers.js";
import validacionTurno from "../middleware/validarTurno.js";

const router = Router();

router
  .route("/")
  .post(validacionTurno, crearTurno)
  .get(obtenerTurnos);
router
  .route("/:id")
  .get(obtenerTurnoPorId)
  .delete(borrarTurnoPorID);

export default router;
