import {Request, Response  } from 'express';

//importacion del pool de conexion a base de datos
import pool from '../database';

class GamesController {
    
    constructor() {
        
    }

    public async getAll (req : Request, res : Response) : Promise<void>{
        const games = await pool.query('select * from games');
        res.json(games);
        
    }

    public async getById (req : Request, res : Response) : Promise<void>{
        const id = req.params.id;
        const game = await pool.query('select * from games where id = ? ', [id]);
        console.log(game);
        if (game.length > 0){
            res.json(game);        
        }else{
            res.status(204).json({message:'El juego no existe'});
        }        
    }

    public async create (req : Request, res : Response) :Promise<void>{
        await pool.query('insert into games set ?', [req.body]);
        res.json ({message:'Juego creado'});
    }

    public async delete (req : Request, res : Response) : Promise<void>{
        const id = req.params.id;
        console.log(id);        
        await pool.query('delete from games where id = ? ', [id]);
        res.json ({message:'Eliminado el juego: ' + id});
    }

    //el async y el await se ponen, junto con Promise, porque el acceso a bd va a ser lento.
    public async update (req : Request, res : Response) : Promise<void>{
        const id = req.params.id;
        await pool.query('update games set ? where id = ? ', [req.body, id])
        res.json ({message:'Actualizado el juego: ' + id});
    }
}

const gamesController = new GamesController();
export default gamesController;