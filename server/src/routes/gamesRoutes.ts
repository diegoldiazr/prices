import { Router } from 'express';
import gamesController from '../controllers/gamesController';

class GamesRoutes {

    public router : Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/', gamesController.getAll);
        this.router.get('/:id', gamesController.getById);
        this.router.post('/', gamesController.create);
        this.router.put('/:id', gamesController.delete);
        this.router.delete('/:id', gamesController.delete);
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;