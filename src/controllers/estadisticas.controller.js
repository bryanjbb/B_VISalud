import { pool2 } from '../db.js';

// Obtener el Total de ventas por día
export const totalVentasPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT 
        DATE_FORMAT(t.fecha, '%Y-%m-%d') AS dia, 
           SUM(hv.subtotal) AS total_ventas
            FROM hechoventa hv
            JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
            GROUP BY t.fecha
            ORDER BY t.fecha `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};

export const totalVentasPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      ` SELECT 
          DATE_FORMAT(t.fecha, '%Y-%m') AS mes,
          SUM(hv.subtotal) AS total_ventas
            FROM hechoventa hv
            JOIN Dim_Tiempo t ON hv.id_tiempo = t.id_tiempo
            GROUP BY t.fecha
            ORDER BY t.fecha
      `
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de ventas.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de ventas.',
      error: error.message,
    });
  }
};
