import express, { Express, NextFunction } from 'express';
import morgan from 'morgan';
import { authRouter } from './routes/auth.routes';
import { ErrorHandler } from './middlewares/error.handler';
import { userRouter } from './routes/user.routes';
import cookieParser from 'cookie-parser';
import { tourRouter } from './routes/public.tour.routes';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { Request, Response } from 'express';
import { AppError } from './utils/global/app.error';
import { agentTourRouter } from './routes/agent.tour.routes';
import { adminTourRouter } from './routes/admin.tour.routes';
import { adminMediaRouter } from './routes/admin.media.routes';
import { agentMediaRouter } from './routes/agent.media.routes';

const app: Express = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(morgan('dev'));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors(corsOptions));

// -----------

// Routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/agents/tours', agentTourRouter);
app.use('/api/v1/admin/tours', adminTourRouter);
app.use('/api/v1/admin/media', adminMediaRouter);
app.use('/api/v1/agents/media', agentMediaRouter);

app.use('/*path', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `404 ${req.originalUrl} Cannot find on this server!`));
});
// -----------

// Global Error Handlers
app.use(ErrorHandler);
// -----------

export default app;
