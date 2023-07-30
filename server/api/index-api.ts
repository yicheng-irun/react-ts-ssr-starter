import express from 'express';
import { apiPostsRouter } from './posts';

export const apiIndexRouter = express.Router();

apiIndexRouter.use('/posts', apiPostsRouter)                     