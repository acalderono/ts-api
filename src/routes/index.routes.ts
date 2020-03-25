import { Router } from 'express';
import { indexWelcome } from './../controllers/index.controller';

const app = Router();

app.route('/').get(indexWelcome);

export default app;