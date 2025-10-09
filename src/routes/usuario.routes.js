import { Router } from "express";
import {
  registrarUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  editarUsuarioPorId,
  borrarUsuarioPorId,
} from "../controllers/usuario.controllers.js";

import validarUsuario from "../middleware/validarUsuario.js";
import validarIdUsuario from "../middleware/validarIdUsuario.js";

const router = Router();

router.route("/").post(validarUsuario, registrarUsuario).get(obtenerUsuarios);

router
  .route("/:id")
  .get(validarIdUsuario, obtenerUsuarioPorId)
  .delete(validarIdUsuario, borrarUsuarioPorId)
  .put(validarIdUsuario, validarUsuario, editarUsuarioPorId);

export default router;
