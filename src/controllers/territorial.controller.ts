import { Request, Response } from 'express';
import { connect } from '../database';

export async function getRegiones(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    return await conn.query(`select * from region`)
        .then((data) => {
            return res.status(200).json(data[0]);
        }).catch((err) => {
            return res.status(500).send({ status: 500, code: err.code, message: err.message })
        })
}

export async function getRegion(req: Request, res: Response): Promise<Response> {
    if (!req.params.id) {
        return res.status(400).send('Se necesita el id!');
    }
    const conn = await connect();
    return await conn.query('select * from region where id_region = ?', [req.params.id])
        .then((data) => {
            return res.status(200).json(data[0]);
        })
        .catch((err) => {
            return res.status(500).send({ status: 500, code: err.code, message: err.message })
        });
}

export async function getComunas(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    return await conn.query(`select * from comuna`).then((data) => {
        return res.status(200).json(data[0]);
    })
        .catch((err) => {
            return res.status(500).send({ status: 500, code: err.code, message: err.message })
        });
}

export async function getComuna(req: Request, res: Response): Promise<Response> {
    if (!req.params.id) {
        return res.status(400).send('Se necesita el id!');
    }
    const conn = await connect();
    return await conn.query(`select * from comuna WHERE id_comuna = ?`, [req.params.id])
        .then((data) => {
            return res.status(200).json(data[0]);
        })
        .catch((err) => {
            return res.status(500).send({ status: 500, code: err.code, message: err.message })
        });
}