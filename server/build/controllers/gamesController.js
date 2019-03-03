"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('select * from games');
            res.json(games);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const game = yield database_1.default.query('select * from games where id = ? ', [id]);
            console.log(game);
            if (game.length > 0) {
                res.json(game);
            }
            else {
                res.status(204).json({ message: 'El juego no existe' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('insert into games set ?', [req.body]);
            res.json({ message: 'juego creado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            console.log(id);
            yield database_1.default.query('delete from games where id = ? ', [id]);
            res.json({ message: 'Eliminado el juego: ' + id });
        });
    }
    update(req, res) {
        res.json({ text: 'actualizando un juego: ' + req.params.id });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
