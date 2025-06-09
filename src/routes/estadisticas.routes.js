
import { Router } from 'express';
import { totalVentasPorDia, totalVentasPorMes} from "../controllers/estadisticas.controller.js";

const router = Router();

// Ruta para obtener todos los empleados
router.get('/totalventaspordia', totalVentasPorDia);
router.get('/totalventaspormes', totalVentasPorMes);

export default router;