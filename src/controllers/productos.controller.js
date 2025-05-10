import { pool } from '../db.js';
import path from 'path';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        p.id_producto,
        p.nombre_producto,
        p.id_laboratorio,
        l.nombre_laboratorio AS nombre_laboratorio,
        p.id_presentacion,
        pr.nombre_presentacion AS nombre_presentacion,
        p.vencimiento,
        p.precio_unitario,
        p.stock,
        p.imagen
      FROM productos p
      JOIN Laboratorio l ON p.id_laboratorio = l.id_laboratorio
      JOIN Presentacion pr ON p.id_presentacion = pr.id_presentacion
    `);

    const productosFormateados = result.map((row) => ({
      ...row,
      imagen_url: row.imagen ? `/uploads/${row.imagen}` : null
    }));

    res.json(productosFormateados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los productos.',
    });
  }
};

// Obtener un producto por su ID
export const obtenerProducto = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [req.params.id]);

    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del producto no fue encontrado.`
      });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del producto.'
    });
  }
};

// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
  try {
    const { nombre_producto, id_presentacion, id_laboratorio, vencimiento, precio_unitario, stock } = req.body;
    const imagen = req.file?.filename || null;

    if (!nombre_producto || !id_presentacion || !id_laboratorio || !vencimiento || !precio_unitario || !stock) {
      return res.status(400).json({ mensaje: 'Todos los campos son requeridos.' });
    }

    const [result] = await pool.query(
      'INSERT INTO productos (nombre_producto, id_presentacion, id_laboratorio, vencimiento, precio_unitario, stock, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre_producto, id_presentacion, id_laboratorio, vencimiento, precio_unitario, stock, imagen]
    );

    res.status(201).json({ id_producto: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el producto.',
    });
  }
};

// Actualizar un producto por su ID
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    if (req.file) {
      datos.imagen = req.file.filename;
    }

    const [resultado] = await pool.query(
      'UPDATE productos SET ? WHERE id_producto = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El producto con ID ${id} no existe.`,
      });
    }

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar los datos del producto.',
      error: error,
    });
  }
};

// Eliminar un producto por su ID
export const eliminarProducto = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el producto. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el producto.',
      error: error.message
    });
  }
};
