import { Request, Response } from 'express';
import { connect } from '../database';

export class TerritorialController {

    async getRegiones(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        return await conn.query(`
    select 
        reg.id_region id,
        reg.desc_region name
        from region reg
    `)
            .then((data) => {
                return res.status(200).json({ ok: true, data: data[0] });
            }).catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            })
    }

    async getRegion(req: Request, res: Response): Promise<Response> {
        if (!(Number(req.params.id))) {
            return res.status(400).send({ ok: false, code: '-1', message: 'ID no valido' });
        }
        const conn = await connect();
        return await conn.query(`
    select 
        reg.id_region id,
        reg.desc_region name
        from region reg
        where reg.id_region = ?`, [req.params.id])
            .then((data) => {
                return res.status(200).json({ ok: true, data: data[0] });
            })
            .catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            });
    }

    async getComunaOfRegion(req: Request, res: Response): Promise<Response> {
        if (!Number(req.params.id)) {
            return res.status(400).send({ ok: false, code: '-1', message: 'ID no valido' });
        }
        const conn = await connect();
        return await conn.query(`
            select 
            com.id_comuna id,
            com.desc_comuna name
            from comuna com
            right join provincia prov
            on com.id_provincia = prov.id_provincia
            left join region reg
            on reg.id_region = prov.id_region
            where reg.id_region = ?`, [req.params.id])
            .then((data) => {
                return res.status(200).json({ ok: true, data: data[0] });
            })
            .catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            });
    }

    private async getComunas(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        return await conn.query(`select * from comuna`).then((data) => {
            return res.status(200).json({ ok: true, data: data[0] });
        })
            .catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            });
    }

    private async getComuna(req: Request, res: Response): Promise<Response> {
        if (!Number(req.params.id)) {
            return res.status(400).send({ ok: false, code: '-1', message: 'ID no valido' });
        }
        const conn = await connect();
        return await conn.query(`select * from comuna WHERE id_comuna = ?`, [req.params.id])
            .then((data) => {
                return res.status(200).json({ ok: true, data: data[0] });
            })
            .catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            });
    }

}