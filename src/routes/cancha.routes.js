import { Router } from "express";
import { borrarCanchaPorID, crearCancha, editarCanchaPorID, obtenerCanchaPorId, obtenerCanchas } from "../controllers/cancha.controllers.js";
import validacionCancha from "../middleware/validarCancha.js";
import verificarToken from "../middleware/verificarToken.js";
import validarIdCancha from "../middleware/validarIdCancha.js";
import upload from "../helpers/upload.js";
import errorMulter from "../middleware/errorMulter.js";

const router = Router();


router.route("/").post([verificarToken, upload, errorMulter, validacionCancha],crearCancha).get(obtenerCanchas);
router.route("/:id").get(validarIdCancha,obtenerCanchaPorId).delete([verificarToken,validarIdCancha],borrarCanchaPorID).put([verificarToken, validarIdCancha, upload, errorMulter, validacionCancha],editarCanchaPorID)

export default router;
