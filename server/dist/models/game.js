"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../db");
const create = (game, callback) => {
    const queryString = "INSERT INTO `game`(`Name`, `Summary`, `ReleaseDate`, `CompanyID`, `StartingPrice`, `Thumbnail`) VALUES (?,?,?,?,?,?)";
    if (game.company.id == undefined) {
        const err2 = new Error('No Company ID was selected');
        callback(err2, -1);
        return;
    }
    db_1.db.query(queryString, [game.name, game.summary, game.releaseDate, game.company.id, game.startingPrice, game.thumbnail], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (gameID, companyId, callback) => {
    const queryString = "SELECT g.*, c.*,g.Name as 'GameName',g.id as 'GameID' FROM game as g INNER JOIN company as c on c.id=g.CompanyID where g.id=? and c.id=?";
    db_1.db.query(queryString, [gameID, companyId], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Where is no game with selected ID');
            callback(err2);
            return;
        }
        const game = {
            id: row.GameID,
            name: row.GameName,
            summary: row.Summary,
            releaseDate: row.ReleaseDate,
            startingPrice: row.StartingPrice,
            thumbnail: row.Thumbnail,
            howManyRated: row.howManyRated,
            company: {
                id: row.id,
                name: row.Name,
                creationDate: row.CreationDate,
                image: row.Image
            }
        };
        callback(null, game);
    });
};
exports.findOne = findOne;
const findAll = (companyID, callback) => {
    const queryString = "SELECT g.*, c.*,g.Name as 'GameName',g.id as 'GameID' FROM game as g INNER JOIN company as c on c.id=g.CompanyID where c.id=?";
    db_1.db.query(queryString, companyID, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const games = [];
        rows.forEach(row => {
            const game = {
                id: row.GameID,
                name: row.GameName,
                summary: row.Summary,
                releaseDate: row.ReleaseDate,
                startingPrice: row.StartingPrice,
                thumbnail: row.Thumbnail,
                howManyRated: row.HowManyRated,
                company: {
                    id: row.id,
                }
            };
            games.push(game);
        });
        callback(null, games);
    });
};
exports.findAll = findAll;
const update = (game, callback) => {
    const queryString = "UPDATE `game` SET `Name`=?,`Summary`=?,`ReleaseDate`=?,`CompanyID`=?,`StartingPrice`=?,`Thumbnail`=? WHERE id=?";
    db_1.db.query(queryString, [game.name, game.summary, game.releaseDate, game.company.id, game.startingPrice, game.thumbnail, game.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
const deleteOne = (gameId, callback) => {
    const queryString = "DELETE FROM `game` WHERE id=?";
    db_1.db.query(queryString, gameId, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.deleteOne = deleteOne;
