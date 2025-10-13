import { Router } from "express";
import {
  registrarUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  borrarUsuarioPorId,
  editarUsuarioPorId,
  login,
} from "../controllers/usuario.controllers.js";

import validarUsuario from "../middleware/validarUsuario.js";
import validarIdUsuario from "../middleware/validarIdUsuario.js";
import verificarToken from "../middleware/verificarToken.js";

const router = Router();

router.route("/login").post(login);

router
  .route("/")
  .post(validarUsuario, registrarUsuario)
  .get(verificarToken, obtenerUsuarios);

router
  .route("/:id")
  .get(validarIdUsuario, obtenerUsuarioPorId)
  .delete(validarIdUsuario, verificarToken, borrarUsuarioPorId)
  .put(validarIdUsuario, verificarToken, validarUsuario, editarUsuarioPorId);

export default router;
