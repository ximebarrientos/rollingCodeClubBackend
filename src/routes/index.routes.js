import { Router } from "express";
//import productoRouter from "./producto.routes.js";
//import usuarioRouter from "./usuario.routes.js";
import canchaRouter from "./cancha.routes.js";

const router = Router();

//router.use("/productos",productoRouter)
//router.use("/usuarios",usuarioRouter)
router.use("/canchas",canchaRouter)

export default router;