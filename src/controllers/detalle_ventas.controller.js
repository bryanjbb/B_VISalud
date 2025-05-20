import { pool } from '../db.js';  

export const obtenerDetallesVenta = async (req, res) => {
    const { id } = req.params; // Obtiene el id de los parámetros de la URL
    try {
      const [result] = await pool.query(
        `
        SELECT 
          dv.id_detalleventa,
          dv.numero_factura,
          dv.id_producto,
          dv.cantidad,
          dv.precio_unitario,
          p.nombre_producto,
          (dv.cantidad * dv.precio_unitario) AS subtotal
        FROM Detalles_Ventas dv
        INNER JOIN Productos p ON dv.id_producto = p.id_producto
        WHERE dv.numero_factura = ?
      `,
        [id]
      );
  
      if (result.length === 0) {
        return res.status(404).json({
          mensaje: 'No se encontraron detalles para esta venta.',
        });
      }
  
      res.json(result);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al obtener los detalles de la venta.',
        error: error.message,
      });
    }
  };
