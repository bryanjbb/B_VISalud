import { pool } from '../db.js';

// Obtener todos los Presentaciones
export const obtenerPresentaciones = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM presentacion');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los presentacion.',
      error: error
    });
  }
};

// Registrar un nuevo Presentacion
export const registrarPresentacion = async (req, res) => {
  try {
    const { nombre_presentacion } = req.body;

    const [result] = await pool.query(
      'INSERT INTO presentacion (nombre_presentacion) VALUES (?)',
      [nombre_presentacion]
    );

    res.status(201).json({ id_presentacion: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar la presentacion.',
      error: error
    });
  }
};

// Actualizar un Presentacion por su ID
export const actualizarPresentacion = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE presentacion SET ? WHERE id_presentacion = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `La presentacion con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar la presentacion.',
      error: error,
    });
  }
};

// Eliminar un Presentacion por su ID
export const eliminarPresentacion = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM presentacion WHERE id_presentacion = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la presentacion. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la presentacion.',
      error: error.message
    });
  }
};
