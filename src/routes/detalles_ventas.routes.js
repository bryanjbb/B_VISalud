import { Router } from "express";
import { obtenerDetallesVenta } from "../controllers/detalle_ventas.controller";

const router = Router ();

 router.get('obtenerdetallesventa/:id', obtenerDetallesVenta);

 export default router;

