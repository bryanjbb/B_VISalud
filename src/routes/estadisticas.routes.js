import { Router } from 'express';
import { totalVentasPorMes, totalVentasPorSemana, VentasPorAnio} from "../controllers/estadisticas.controller.js";

const router = Router();

// Ruta para obtener todos los empleados
router.get('/totalventasporsemana', totalVentasPorSemana);
router.get('/totalventasporanio', VentasPorAnio);
router.get('/totalventaspormes', totalVentasPorMes);

export default router;