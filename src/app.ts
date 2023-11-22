import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
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

export default app;
