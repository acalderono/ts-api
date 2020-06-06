import { Request, Response } from 'express';
import { connect } from '../database';
import moment from 'moment';

export class TaskController {


    
    constructor() {
    }

    async getMyHoursOfWeek(req: Request, res: Response): Promise<Response> {
        if (!(Number(req.params.id))) {
            return res.status(400).send({ ok: false, code: '-1', message: 'ID no valido' });
        }
        let weekNow = await moment().isoWeek();
        let yearNow = await moment().weekYear();

        let year: number[] | number = ((req.query.year)) ? req.query.year : yearNow;
        let week: number[] | number = ((req.query.week)) ? req.query.week : weekNow;

        const conn = await connect();
        return await conn.query(`
                select
                user_id id,
                tyear year,
                tweek week,
                hours
                from time_entries
                where user_id = ?
                and tyear = ?
                and tweek in (${week})
                order by tyear, tweek desc
        `, [req.params.id, year])
            .then((data) => {
                return res.status(200).json({ ok: true, data: data[0] });
            })
            .catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            });
    }

    async getUsers(req: Request, res: Response): Promise<Response> {
        const conn = await connect();
        return await conn.query(`
        select
            u.id id_user,
            u.login,
            u.firstname,
            u.lastname,
            team.id id_team,
            team.lastname team
        from users u
            left join groups_users gu
            on u.id = gu.user_id
            left join users team
            on (gu.group_id = team.id and team.type = 'Group')
            where
            u.type = 'User' and
            u.status = 1;`)
            .then((data) => {
                return res.status(200).json({ ok: true, data: data[0] });
            }).catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            })
    }

    async getWeeklyTeamHours(req: Request, res: Response): Promise<Response> {

        if (!(Number(req.params.id))) {
            return res.status(400).send({ ok: false, code: '-1', message: 'ID no valido' });
        }

        let weekNow = await moment().isoWeek();
        let lastWeek = await moment().isoWeek()-1;
        let yearNow = await moment().weekYear();

        // let lastTwoWeek: boolean = false;
        let week: number | number[] | string;
        if (req.query.lastweek) {
            week = `${lastWeek},${weekNow}`;
        } else {
            week = ((req.query.week)) ? req.query.week : weekNow;
        }   

        console.log(week);
        let year: number[] | number = ((req.query.year)) ? req.query.year : yearNow;
        
        const conn = await connect();
        return await conn.query(`
        SELECT 
            ug.id id_team,
            ug.lastname   team, 
            u.id          id_user, 
            u.login user, 
            u.firstname,
            u.lastname,
            custom.area, 
            custom.asignacion assignment, 
            custom.cliente customer, 
            Sum(te.hours) hours, 
            te.spent_on,
            te.tyear      year, 
            te.tweek      week, 
            p.id          id_project, 
            p.name        project 
        FROM   users ug 
                LEFT JOIN groups_users gu 
                    ON ug.id = gu.group_id 
                LEFT JOIN users u 
                    ON ( gu.user_id = u.id 
                            AND u.type = 'User' ) 
                LEFT JOIN time_entries te 
                    ON ( u.id = te.user_id ) 
                LEFT JOIN projects p 
                    ON ( te.project_id = p.id ) 
                INNER JOIN (SELECT cv.customized_id id_project, 
                                Max(CASE 
                                        WHEN cf.name = 'Área' THEN cfe.name 
                                    end)         area, 
                                Max(CASE 
                                        WHEN cf.name = 'Asignación' THEN cfe.name 
                                    end)         asignacion, 
                                Max(CASE 
                                        WHEN cf.name = 'Cliente' THEN cfe.name 
                                    end)         cliente 
                            FROM   custom_values cv 
                                INNER JOIN custom_fields cf 
                                        ON cv.custom_field_id = cf.id 
                                LEFT JOIN custom_field_enumerations cfe 
                                        ON ( cf.id = cfe.custom_field_id 
                                            AND cv.value = cfe.id ) 
                            WHERE  cf.field_format = 'enumeration' 
                            GROUP  BY cv.customized_id) custom 
                        ON p.id = custom.id_project 
        WHERE  ug.status = 1 
                AND ug.id = ? 
                AND ug.type = 'Group' 
                AND u.status = 1 
                AND te.tweek IN ( ${week} ) 
                AND te.tyear = ? 
        GROUP  BY ug.id, 
                ug.lastname, 
                u.id, 
                u.login, 
                u.firstname,
                u.lastname,
                te.project_id, 
                te.spent_on,
                te.tyear, 
                te.tweek, 
                p.name
              ORDER  BY te.spent_on DESC;`, [ req.params.id, year ])
            .then((data) => {
                return res.status(200).json({ ok: true, data: data[0] });
            })
            .catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            });

    }

    async getProject(req: Request, res: Response): Promise<Response> {
        if (!Number(req.params.id)) {
            return res.status(400).send({ ok: false, code: '-1', message: 'ID no valido' });
        }

        let weekNow = await moment().isoWeek();
        let yearNow = await moment().weekYear();
        let year: number = (Number(req.query.year)) ? req.query.year : yearNow;
        let week: number = (Number(req.query.week)) ? req.query.week : weekNow;

        const conn = await connect();
        return await conn.query(`
                select
                p.id id_project,
                p.name project,
                max(case when cf.name = 'Área' then cfe.name end) area,
                max(case when cf.name = 'Asignación' then cfe.name end) asignacion,
                max(case when cf.name = 'Cliente' then cfe.name end) cliente,
                sum(te.hours) hours
                from 
                projects p
                left join time_entries te
                on p.id = te.project_id
                left join custom_values cv
                on p.id = cv.customized_id
                left join custom_fields cf
                on cv.custom_field_id = cf.id
                inner join custom_field_enumerations cfe
                on (cf.id = cfe.custom_field_id and cv.value = cfe.id)
                where 
                p.id = ?
                and te.tyear = ?
                and te.tweek = ?
                and p.status = 1
                group by p.id, p.name`, [ req.params.id, year, week])
            .then((data: any) => {
                return res.status(200).json({ ok: true, data: data[0] });
            })
            .catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            });
    }



    async getHoursWeek(req: Request, res: Response): Promise<Response> {
        if (!Number(req.params.id)) {
            return res.status(400).send({ ok: false, code: '-1', message: 'ID no valido' });
        }
        const conn = await connect();
        return await conn.query(`
                select tyear, tweek, sum(hours) hours
                from time_entries
                where
                tweek = ? and
                tyear = 2020
                group by tyear, tweek
                order by tyear, tweek desc
                `, [ req.params.id])
            .then((data) => {
                return res.status(200).json({ ok: true, data: data[0] });
            })
            .catch((err) => {
                return res.status(500).send({ ok: false, code: err.code, message: err.message })
            });
    }

}