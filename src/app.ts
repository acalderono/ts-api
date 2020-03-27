import express, { Application } from 'express';
import morgan from 'morgan';
import compression from "compression";
import { config as dotenv } from 'dotenv';
import { TerritorialRouter } from './router/territorial.routes';

export class App {

    private _app: Application;

    constructor(private port?: number | string) {
        this._app = express();
        this.middleware();
        this.routes();
        dotenv();
    }

    settings() {
        this._app.set('port', this.port || process.env.PORT || 3000);
    }

    middleware() {
        this._app.use(compression());
        this._app.use(morgan('dev'));
    }

    routes() {
        this._app.use('/api', new TerritorialRouter().router);
    }

    async listen() {
        this.settings();
        const port = this._app.get('port');
        await this._app.listen(port);
        console.log(`Server Running in Port:`, port);
    }
}