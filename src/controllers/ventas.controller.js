import { pool } from '../db.js';

// Obtener todas las ventas con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerVentasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
    SELECT 
          dv.id_detalleventa,
          dv.numero_factura,
          dv.id_producto,
          dv.cantidad,
          dv.precio_unitario,
          p.nombre_producto,
          (dv.cantidad * dv.precio_unitario) AS subtotal
        FROM Detalle_Venta dv
        INNER JOIN Productos p ON dv.id_producto = p.id_producto

    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error
    });
  }
};

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        v.numero_factura,
        v.fecha_venta,
        v.id_usuario,
        u.id_usuario ,
        v.total_venta
      FROM Ventas v
      left JOIN Usuarios u on v.id_usuario = u.id_usuario
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error
    });
  }
};

// Eliminar una venta (los detalles se eliminan automáticamente por ON DELETE CASCADE)
export const eliminarVenta = async (req, res) => {
  try {
    const { numero_factura } = req.params;

    const [result] = await pool.query('DELETE FROM ventas WHERE numero_factura = ?', [numero_factura]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    res.json({ mensaje: 'Venta y sus detalles eliminados correctamente' });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar la venta',
      error: error.message
    });
  }
};

// Registrar una nueva venta con detalles
export const registrarVenta = async (req, res) => {
  const { id_usuario, fecha_venta, total_venta, detalles } = req.body;

  try {
    const [ventaResult] = await pool.query(
      'INSERT INTO ventas (id_usuario, fecha_venta, total_venta) VALUES (?, ?, ?)',
      [id_usuario, fecha_venta, total_venta]
    );

    const numero_factura = ventaResult.insertId;

    for (const detalle of detalles) {
      await pool.query(
        'INSERT INTO detalle_venta (numero_factura, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [numero_factura, detalle.id_producto, detalle.cantidad, detalle.precio_unitario]
      );
      await pool.query(
        'UPDATE Productos SET stock = stock - ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Venta registrada correctamente' });
  } catch (error) {
    console.error('Error en registrarVenta:', error);
    res.status(500).json({ mensaje: 'Error al registrar la venta', error: error.message });
  }
};

// Actualizar una venta con sus detalles
export const actualizarVenta = async (req, res) => {
  try {
    const { numero_factura } = req.params;
    const { id_usuario, fecha_venta, total_venta, detalles } = req.body;

    // Obtener la fecha y hora actual en formato 'YYYY-MM-DD HH:mm:ss'
    const nuevaFechaVenta = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Actualizar la venta con la nueva fecha
    const [ventaResult] = await pool.query(
      'UPDATE ventas SET id_usuario = ?, fecha_venta = ?, total_venta = ? WHERE numero_factura = ?',
      [id_usuario, nuevaFechaVenta, total_venta, numero_factura]
    );

    if (ventaResult.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Obtener detalles actuales para restaurar stock
    const [detallesActuales] = await pool.query(
      'SELECT id_producto, cantidad FROM detalle_venta WHERE numero_factura = ?',
      [numero_factura]
    );

    // Restaurar stock de productos anteriores
    for (const detalle of detallesActuales) {
      await pool.query(
        'UPDATE Productos SET stock = stock + ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    // Eliminar detalles actuales
    await pool.query('DELETE FROM detalle_venta WHERE numero_factura = ?', [numero_factura]);

    // Insertar nuevos detalles y actualizar stock
    for (const detalle of detalles) {
      await pool.query(
        'INSERT INTO detalle_venta (numero_factura, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [numero_factura, detalle.id_producto, detalle.cantidad, detalle.precio_unitario]
      );
      await pool.query(
        'UPDATE Productos SET stock = stock - ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Venta actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la venta', error: error.message });
  }
};