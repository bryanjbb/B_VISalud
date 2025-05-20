import { Router } from "express";
import { obtenerVentasConDetalles, obtenerVentas } from "../controllers/ventas.controller.js";

const router = Router ();

router.get('/ventas', obtenerVentas);
router.get('/obtenerventas', obtenerVentasConDetalles);

export default router;