import { Request, Response } from 'express';
import { connect } from '../database';

export async function getPersonas(req: Request, res: Response): Promise<Response> {
   const conn = await connect();
   const personas = await conn.query('select * from persona limit 10');
   return res.json(personas[0]);
}