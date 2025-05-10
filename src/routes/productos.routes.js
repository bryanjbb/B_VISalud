import { Router } from 'express';
import {  obtenerProductos, obtenerProducto, registrarProducto, actualizarProducto, eliminarProducto  } from '../controllers/productos.controller.js';


const router = Router();

// Ruta para obtener todos los productos
router.get('/productos', obtenerProductos);

// Ruta para obtener un produto por su ID
router.get('/producto/:id', obtenerProducto);

//Ruta para registrar un producto
router.post('/registrarproducto', registrarProducto);

//Ruta para actualizar un producto
router.patch('/actualizarproducto/:id', actualizarProducto);

//Ruta para eliminar un producto
router.delete('/eliminarproducto/:id', eliminarProducto);

export default router;