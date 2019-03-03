import {Request, Response  } from 'express';

//importacion del pool de conexion a base de datos
import pool from '../database';

class GamesController {
    
    constructor() {
        
    }

    public getAll (req : Request, res : Response) {
        //var q = pool.query('select * from games');
        res.send('todos los juegos');
        
    }

    public getById (req : Request, res : Response) {
        //var q = pool.query('select * from games');
        res.send('Obtener el juego ' + req.params.id);
        
    }

    public create (req : Request, res : Response) {
        pool.query('insert into games (title, description) values ("primer juego", "diego")');
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