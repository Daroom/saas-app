import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import {errorHandler} from './utils/errorHandler';
import customerRoutes from './routes/customerRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import licenseRoutes from './routes/licenseRoutes';
import companyRoutes from './routes/companyRoutes';
import authRoutes from './routes/authRoutes';
import { authenticateJWT } from './middlewares/authMiddleware';
// import userRoutes from './routes/userRoutes';


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/customers',authenticateJWT, customerRoutes);
app.use('/api/invoices',authenticateJWT, invoiceRoutes);
app.use('/api/licenses',authenticateJWT, licenseRoutes);  
app.use('/api/companies',authenticateJWT, companyRoutes);
app.use(errorHandler);

export default app; 