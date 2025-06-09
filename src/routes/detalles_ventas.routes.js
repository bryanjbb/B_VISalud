import { Router } from "express";
import { obtenerDetallesVenta } from "../controllers/detalles_ventas.controller.js";

const router = Router ();

 router.get('/obtenerdetallesventa/:id', obtenerDetallesVenta);

 export default router;

