import { Router } from "express";
import {
  registrarUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  borrarUsuarioPorId,
  editarUsuarioPorId,
  login,
  alternarEstadoUsuario,
} from "../controllers/usuario.controllers.js";

import validarUsuario from "../middleware/validarUsuario.js";
import validarIdUsuario from "../middleware/validarIdUsuario.js";
import verificarToken from "../middleware/verificarToken.js";
import validarAdmin from "../middleware/validarAdmin.js";

const router = Router();

router.route("/login").post(login);

router
  .route("/")
  .post(validarUsuario, registrarUsuario)
  .get([verificarToken, validarAdmin], obtenerUsuarios);

router
  .route("/:id")
  .get(validarIdUsuario, obtenerUsuarioPorId)
  .put([verificarToken, validarIdUsuario], editarUsuarioPorId)
  .delete([verificarToken, validarAdmin, validarIdUsuario], borrarUsuarioPorId);

router
  .route("/:id/estado")
  .put([verificarToken, validarAdmin, validarIdUsuario], alternarEstadoUsuario);

export default router;
