import { Router } from "express";
import { obtenerVentasConDetalles, obtenerVentas, registrarVenta, actualizarVenta, eliminarVenta } from "../controllers/ventas.controller.js";

const router = Router ();

router.get('/ventas', obtenerVentas);
router.get('/obtenerventas', obtenerVentasConDetalles);
router.post('/registrarventa', registrarVenta);
router.patch('/actualizarventa', actualizarVenta);
router.delete('/elimanarventa', obtenerVentasConDetalles);

export default router;