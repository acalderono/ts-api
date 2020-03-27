import { Router } from 'express';
import { TerritorialController } from '../controllers/territorial.controller';

export class TerritorialRouter {
    public router: Router;
    private _territorialController: TerritorialController = new TerritorialController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get('/regiones/all', this._territorialController.getRegiones);
        this.router.get('/regiones/:id', this._territorialController.getRegion);
        this.router.get('/regiones/:id/comunas', this._territorialController.getComunaOfRegion);
    }

}