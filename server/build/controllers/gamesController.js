"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importacion del pool de conexion a base de datos
const database_1 = __importDefault(require("../database"));
class GamesController {
    constructor() {
    }
    getAll(req, res) {
        //var q = pool.query('select * from games');
        res.send('todos los juegos');
    }
    getById(req, res) {
        //var q = pool.query('select * from games');
        res.send('Obtener el juego ' + req.params.id);
    }
    create(req, res) {
        database_1.default.query('insert into games (title, description) values ("primer juego", "diego")');
        res.json({ text: 'creando un juego' });
    }
    delete(req, res) {
        res.json({ text: 'eliminando un juego: ' + req.params.id });
    }
    update(req, res) {
        res.json({ text: 'actualizando un juego: ' + req.params.id });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
