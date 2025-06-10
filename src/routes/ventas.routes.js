import { Router } from "express";
import { obtenerVentasConDetalles, obtenerVentas, registrarVenta, actualizarVenta, eliminarVenta } from "../controllers/ventas.controller.js";
import { obtenerVentaPorId } from "../controllers/obtenerVentasPorId.js";
const router = Router ();

router.get('/ventas', obtenerVentas);
router.get('/obtenerventas', obtenerVentasConDetalles);
router.post('/registrarventa', registrarVenta);
router.patch('/actualizarventa/:id_venta', actualizarVenta);
router.delete('/eliminarventa/:numero_factura', eliminarVenta);
router.get('/obtenerventaporid/:id_venta', obtenerVentaPorId);

export default router;