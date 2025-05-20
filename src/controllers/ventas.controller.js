import { pool } from '../db.js';

// Obtener todas las ventas con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerVentasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
     SELECT 
        v.numero_factura,
        dv.id_detalleventa,
        v.fecha_venta,
        u.usuario            AS nombre_usuario,    
        p.nombre_producto,
        dv.cantidad,
        dv.precio_unitario,
        (dv.cantidad * dv.precio_unitario) AS subtotal
        FROM Ventas v
        INNER JOIN Detalle_Venta dv   ON v.numero_factura = dv.numero_factura
        INNER JOIN Productos p        ON dv.id_producto    = p.id_producto
        INNER JOIN Usuarios u         ON v.id_usuario      = u.id_usuario

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
        u.usuario ,
        v.total_venta
      FROM Ventas v
      INNER JOIN Usuarios u on v.id_usuario = u.id_usuario
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error
    });
  }
};
