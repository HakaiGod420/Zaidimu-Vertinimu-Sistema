"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.deleteOne = exports.create = exports.findOne = exports.findAll = void 0;
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
const findOne = (reviewId, gameId, callback) => {
    const queryString = "SELECT * FROM `review` WHERE GameId=? AND id=?";
    db_1.db.query(queryString, [gameId, reviewId], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Where is no review with selected ID');
            callback(err2);
            return;
        }
        const review = {
            id: row.id,
            comment: row.Comment,
            rating: row.Rating,
            postDate: row.PostDate,
            user: {
                id: row.UserId
            },
            game: {
                id: row.GameId
            }
        };
        callback(null, review);
    });
};
exports.findOne = findOne;
const create = (review, callback) => {
    const queryString = "INSERT INTO `review`(`Comment`, `Rating`, `UserId`, `GameId`, `PostDate`) VALUES (?,?,?,?,?)";
    if (review.game.id == undefined) {
        const err2 = new Error('No Game ID was selected');
        callback(err2, -1);
        return;
    }
    else if (review.user.id == undefined) {
        const err2 = new Error('No User ID was selected');
        callback(err2, -1);
        return;
    }
    db_1.db.query(queryString, [review.comment, review.rating, review.user.id, review.game.id, review.postDate], (err, result) => {
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
const deleteOne = (reviewId, callback) => {
    const queryString = "DELETE FROM `review` WHERE id=?";
    db_1.db.query(queryString, reviewId, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.deleteOne = deleteOne;
const update = (review, callback) => {
    const queryString = "UPDATE `review` SET `Comment`=?,`Rating`=?,`UserId`=?,`GameId`=?,`PostDate`=? WHERE id=?";
    db_1.db.query(queryString, [review.comment, review.rating, review.user.id, review.game.id, review.postDate, review.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
