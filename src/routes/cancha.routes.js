import { Router } from "express";
import { crearCancha, prueba } from "../controllers/cancha.controllers.js";

const router = Router();

router.route("/prueba").get(prueba);
router.route("/").post(crearCancha);

export default router;