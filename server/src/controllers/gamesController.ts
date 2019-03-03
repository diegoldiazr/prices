import {Request, Response  } from 'express';

//importacion del pool de conexion a base de datos
import pool from '../database';

class GamesController {
    
    constructor() {
        
    }

    public index (req : Request, res : Response) {
        pool.query('DESCRIBE games');
        res.send(pool.query('DESCRIBE games;'));
        //res.json({id:1, title:'primer juego'});
        
    }

    public create (req : Request, res : Response) {
        res.json ({text:'creando un juego'});
    }

    public delete (req : Request, res : Response) {
        res.json ({text:'eliminando un juego: ' + req.params.id});
    }

    public update (req : Request, res : Response) {
        res.json ({text:'actualizando un juego: ' + req.params.id});
    }
}

const gamesController = new GamesController();
export default gamesController;