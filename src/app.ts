import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { CustomError } from './app/CustomError';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(
    'Welcome to Programming Hero level 2 course Assignment 2 , Student: Raihan Uddin, Email: raihanemon2015@gmail.com  ',
  );
});


app.use((req: Request, res: Response,) => {
  res.status(404).json({ error: 'Not Found' });
});


export default app;
