import { Router } from 'express';
const app = Router();

import { getRegiones, getComunas, getComuna, getRegion } from '../controllers/territorial.controller';

app.route('/regiones')
    .get(getRegiones)

app.route('/regiones/:id')
    .get(getRegion)

app.route('/comunas')
    .get(getComunas);

app.route('/comunas/:id')
    .get(getComuna)

export default app;