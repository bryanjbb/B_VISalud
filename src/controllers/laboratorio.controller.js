import { pool } from '../db.js';

// Obtener todos los laboratorios
export const obtenerLaboratorios = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM laboratorio');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los laboratorios.',
      error: error
    });
  }
};

// Registrar un nuevo laboratorio
export const registrarLaboratorio = async (req, res) => {
  try {
    const { nombre_laboratorio } = req.body;

    const [result] = await pool.query(
      'INSERT INTO laboratorio (nombre_laboratorio) VALUES (?)',
      [nombre_laboratorio]
    );

    res.status(201).json({ id_laboratorio: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el laboratorio.',
      error: error
    });
  }
};

// Actualizar un laboratorio por su ID
export const actualizarLaboratorio = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE laboratorio SET ? WHERE id_laboratorio = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El laboratorio con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el laboratorio.',
      error: error,
    });
  }
};

// Eliminar un laboratorio por su ID
export const eliminarLaboratorio = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM laboratorio WHERE id_laboratorio = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el laboratorio. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el laboratorio.',
      error: error.message
    });
  }
};
