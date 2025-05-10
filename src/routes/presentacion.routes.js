import { Router } from 'express';
import {obtenerPresentaciones, registrarPresentacion, actualizarPresentacion, eliminarPresentacion} from '../controllers/presentacion.controller.js';

const router = Router();

// Ruta para obtener todos los laboratorios
router.get('/presentaciones', obtenerPresentaciones);
//Ruta para registrar un laboratorio
router.post('/registrarpresentacion', registrarPresentacion);
//Ruta para actualizar un laboratorio
router.patch('/actualizarpresentacion/:id', actualizarPresentacion);
//Ruta para eliminar un laboratorio
router.delete('/eliminarpresentacion/:id', eliminarPresentacion);

export default router;