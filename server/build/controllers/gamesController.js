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
    index(req, res) {
        database_1.default.query('DESCRIBE games');
        res.send(database_1.default.query('DESCRIBE games;'));
        //res.json({id:1, title:'primer juego'});
    }
    create(req, res) {
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
