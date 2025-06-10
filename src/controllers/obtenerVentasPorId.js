import { pool } from '../db.js';
// Obtener una venta específica por id_venta
export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id_venta } = req.params;

    const [venta] = await pool.query(`
      SELECT 
        numero_factura,
        fecha_venta,
        total_venta
      FROM Ventas
      WHERE numero_factura = ?
    `, [id_venta]);

    if (venta.length === 0) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    res.json(venta[0]); // Devuelve solo el primer objeto (una sola venta)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener los datos de la venta.',
      error: error.message
    });
  }
};