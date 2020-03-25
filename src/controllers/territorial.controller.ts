import { Request, Response } from 'express';
import { connect } from '../database';

export async function getRegiones(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const regiones = await conn.query(`select * from region`);
    return res.status(200).json(regiones[0]);
}

export async function getRegion(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const region = await conn.query('select * from region where id_region = ?', [req.params.id]);

    return res.status(200).json(region[0]);
}

export async function getComunas(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const comunas = await conn.query(`select * from comuna`);

    return res.status(200).json(comunas[0]);
}

export async function getComuna(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const comuna = await conn.query(`select * WHERE id_comuna = ?`, [req.params.id]);
    return res.status(200).json(comuna[0]);
}