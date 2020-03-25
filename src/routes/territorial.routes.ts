import { Router } from 'express';
const app = Router();

import { getRegiones, getComunas, getComuna, getRegion } from '../controllers/territorial.controller';

app.route('/regiones')
    .get(getRegiones)

app.route('/regiones/:regionId')
    .get(getRegion)

app.route('/comunas')
    .get(getComunas);

app.route('/comunas/:comunaId')
    .get(getComuna)

export default app;