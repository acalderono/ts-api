import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

export class TaskRouter {
    public router: Router;
    private _taskController: TaskController = new TaskController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {

        // ?id_user=5&id_team=7
        this.router.get('/usuarios', this._taskController.getUsers);
        // ?year=2019&week=12?
        this.router.get('/usuarios/:id', this._taskController.getMyHoursOfWeek);
        
        // ?id=7&year=2019&week=12,13&?lastweek=true
        this.router.get('/team/:id', this._taskController.getWeeklyTeamHours);

        // this.router.get('/usuarios/:id/week/:week', this._taskController.getMyHoursOfWeek);
        // this.router.get('/week/:id/', this._taskController.getHoursWeek);

        // year=2019&week=12
        this.router.get('/projects/:id', this._taskController.getProject);
    }

}