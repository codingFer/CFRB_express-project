import express from 'express';
import userRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import authenticateToken from './middlewares/autheticate.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);

app.use(errorHandler);

export default app;