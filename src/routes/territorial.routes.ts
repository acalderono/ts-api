import { Router } from 'express';
const app = Router();

import { getRegiones, getRegion, getComunaOfRegion } from '../controllers/territorial.controller';

app.route('/regiones/all')
    .get(getRegiones)

app.route('/regiones/:id')
    .get(getRegion);

app.route('/regiones/:id/comunas')
    .get(getComunaOfRegion);

// app.route('/comunas')
//     .get(getComunas);

// app.route('/comunas/:id')
//     .get(getComuna)

export default app;