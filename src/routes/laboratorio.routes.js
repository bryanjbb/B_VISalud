import { Router } from 'express';
import {obtenerLaboratorios, actualizarLaboratorio, registrarLaboratorio, eliminarLaboratorio, } from '../controllers/laboratorio.controller.js';

const router = Router();

router.get('/laboratorios', obtenerLaboratorios);
router.post('/registrarlaboratorio', registrarLaboratorio);
router.patch('/actualizarlaboratorio/:id', actualizarLaboratorio);
router.delete('/eliminarlaboratorio/:id', eliminarLaboratorio);

export default router