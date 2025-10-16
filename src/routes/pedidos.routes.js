import { Router } from "express";
import {
  obtenerPedidos,
  obtenerPedidosAprobados,
} from "../controllers/pedidos.controllers.js";

const router = Router();

router.get("/", obtenerPedidos);
router.get("/aprobados", obtenerPedidosAprobados);

export default router;
