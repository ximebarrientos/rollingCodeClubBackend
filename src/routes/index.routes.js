import { Router } from "express";
import productoRouter from "./producto.routes.js";
import usuarioRouter from "./usuario.routes.js";
import canchaRouter from "./cancha.routes.js";
import turnoRouter from "./turno.routes.js";
import pagosRouter from "./pagos.routes.js";
import pedidosRouter from "./pedidos.routes.js";

const router = Router();

router.use("/productos", productoRouter);
router.use("/canchas", canchaRouter);
router.use("/turnos", turnoRouter);
router.use("/usuarios", usuarioRouter);
router.use("/pagos", pagosRouter);
router.use("/pedidos", pedidosRouter);

export default router;
