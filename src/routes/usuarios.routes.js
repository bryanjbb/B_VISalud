import { Router } from 'express';
import {  verificarUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

// Ruta para verificar un usuario y contraseña.
router.post('/verificar', verificarUsuario);

export default router;