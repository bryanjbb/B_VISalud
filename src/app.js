import express from 'express';
import cors from 'cors';
import rutasProductos from "./routes/productos.routes.js"
import rutasLaboratorios from './routes/laboratorio.routes.js'
import rutasPresentacion from './routes/presentacion.routes.js'
import rutasEstadisticas from "./routes/estadisticas.routes.js"
import rutasVentas from "./routes/ventas.routes.js"
const app = express();

// Habilitar CORS para cualquier origen
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '10mb' })); // Aumenta a 10 MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use(express.json());

app.use('/api', rutasProductos);
app.use('/api', rutasLaboratorios);
app.use('/api', rutasPresentacion);
app.use('/api', rutasEstadisticas)
app.use('/api', rutasVentas);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404 ).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
    });
});

export default app;