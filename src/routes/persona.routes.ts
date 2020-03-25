import { Router } from 'express';
const app = Router();

import { getPersonas } from '../controllers/persona.controller';

app.route('/personas')
    .get(getPersonas)

export default app;