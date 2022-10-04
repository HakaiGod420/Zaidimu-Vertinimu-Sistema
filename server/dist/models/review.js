"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = void 0;
const db_1 = require("../db");
const findAll = (gameID, callback) => {
    const queryString = "SELECT * FROM `review` WHERE GameId=?";
    db_1.db.query(queryString, gameID, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const reviews = [];
        rows.forEach(row => {
            const game = {
                id: row.id,
                comment: row.Comment,
                rating: row.Rating,
                postDate: row.PostDate,
                game: {
                    id: row.GameId
                },
                user: {
                    id: row.UserId
                }
            };
            reviews.push(game);
        });
        callback(null, reviews);
    });
};
exports.findAll = findAll;
