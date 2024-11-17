import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import vehicleRoutes from './routes/vehicles.js';
import maintenanceRoutes from './routes/maintenance.js';
import financeRoutes from './routes/finance.js';
import documentRoutes from './routes/documents.js';
import userRoutes from './routes/users.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173'
}));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', authenticateToken, vehicleRoutes);
app.use('/api/maintenance', authenticateToken, maintenanceRoutes);
app.use('/api/finance', authenticateToken, financeRoutes);
app.use('/api/documents', authenticateToken, documentRoutes);
app.use('/api/users', authenticateToken, userRoutes);

// Handle SPA routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});