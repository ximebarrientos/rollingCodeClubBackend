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
  .post([verificarToken,validarUsuario], registrarUsuario)
  .get(obtenerUsuarios);

router
  .route("/:id")
  .get(validarIdUsuario, obtenerUsuarioPorId)
  .delete([verificarToken,validarIdUsuario], borrarUsuarioPorId)
  .put([verificarToken,validarIdUsuario, validarUsuario], editarUsuarioPorId);

export default router;
