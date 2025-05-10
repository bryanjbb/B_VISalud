import express from 'express';
import cors from 'cors';
import rutasProductos from './routes/productos.routes.js';
import rutasLaboratorios from './routes/laboratorio.routes.js'
import rutasPresentacion from './routes/presentacion.routes.js'
const app = express();

// Habilitar CORS para cualquier origen
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api', rutasProductos);
app.use('/api', rutasLaboratorios);
app.use('/api', rutasPresentacion);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404 ).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
    });
});

export default app;