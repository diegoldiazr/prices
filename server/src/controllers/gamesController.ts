import {Request, Response  } from 'express';

//importacion del pool de conexion a base de datos
import pool from '../database';

class GamesController {
    
    constructor() {
        
    }

    public async getAll (req : Request, res : Response) {
        const games = await pool.query('select * from games');
        res.json(games);
        
    }

    public async getById (req : Request, res : Response) {
        const id = req.params.id;
        const game = await pool.query('select * from games where id = ? ', [id]);
        console.log(game);
        res.json(game);        
    }

    public async create (req : Request, res : Response) :Promise<void>{
        await pool.query('insert into games set ?', [req.body]);
        res.json ({message:'juego creado'});
    }

    public async delete (req : Request, res : Response) {
        const id = req.params.id;
        console.log(id);        
        await pool.query('delete from games where id = ? ', [id]);
        res.json ({message:'Eliminado el juego: ' + id});
    }

    public update (req : Request, res : Response) {
        res.json ({text:'actualizando un juego: ' + req.params.id});
    }
}

const gamesController = new GamesController();
export default gamesController;