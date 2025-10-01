import { Router } from "express";
import { prueba } from "../controllers/cancha.controllers.js";

const router = Router();

router.route("/prueba").get(prueba);

export default router;