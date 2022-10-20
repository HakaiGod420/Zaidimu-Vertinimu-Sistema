"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.deleteOne = exports.create = exports.findOne = exports.findAll = void 0;
const db_1 = require("../db");
const findAll = (gameID, companyId, callback) => {
    const queryString = "SELECT review.id,review.Comment,review.Rating,review.UserId,review.GameId,review.PostDate,game.id as'GameID' FROM `review` INNER JOIN game on GameId=game.id WHERE GameId=? and game.CompanyID = ?;";
    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;";
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;";
    db_1.db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(err2);
            return;
        }
        else {
            db_1.db.query(checkQueryStringGame, gameID, (err, result) => {
                const row = result[0];
                if (row == undefined) {
                    const err2 = new Error('Not Found');
                    callback(err2);
                    return;
                }
                else {
                    db_1.db.query(queryString, [gameID, companyId], (err, result) => {
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
                }
            });
        }
    });
};
exports.findAll = findAll;
const findOne = (reviewId, gameId, companyId, callback) => {
    const queryString = "SELECT review.id as 'reviewID',review.Comment,review.Rating,review.PostDate,review.UserId,game.id as 'GameId' FROM `review` INNER JOIN game on GameId=game.id WHERE review.GameId=? and game.CompanyID = ? and review.id=?;";
    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;";
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;";
    db_1.db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(err2);
            return;
        }
        else {
            db_1.db.query(checkQueryStringGame, gameId, (err, result) => {
                const row = result[0];
                if (row == undefined) {
                    const err2 = new Error('Not Found');
                    callback(err2);
                    return;
                }
                else {
                    db_1.db.query(queryString, [gameId, companyId, reviewId], (err, result) => {
                        if (err) {
                            callback(err);
                        }
                        const row = result[0];
                        if (row == undefined) {
                            const err2 = new Error('Not Found');
                            callback(err2);
                            return;
                        }
                        const review = {
                            id: row.reviewID,
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
                }
            });
        }
    });
};
exports.findOne = findOne;
const create = (review, gameId, companyId, callback) => {
    const queryString = "INSERT INTO `review`(`Comment`, `Rating`, `UserId`, `GameId`, `PostDate`) VALUES (?,?,?,?,?)";
    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;";
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;";
    if (review.user == undefined) {
        const err2 = new Error('Empty User ID');
        callback(err2);
        return;
    }
    db_1.db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(err2);
            return;
        }
        else {
            db_1.db.query(checkQueryStringGame, gameId, (err, result) => {
                const row = result[0];
                if (row == undefined) {
                    const err2 = new Error('Not Found');
                    callback(err2);
                    return;
                }
                else {
                    db_1.db.query(queryString, [review.comment, review.rating, review.user.id, gameId, review.postDate], (err, result) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        ;
                        const insertId = result.insertId;
                        callback(null, insertId);
                    });
                }
            });
        }
    });
};
exports.create = create;
const deleteOne = (reviewId, gameId, companyId, callback) => {
    const queryString = "DELETE FROM `review` WHERE id=? and GameId=?";
    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;";
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;";
    const checkQueryStringReview = "SELECT id FROM review WHERE id=?;";
    db_1.db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(err2);
            return;
        }
        else {
            db_1.db.query(checkQueryStringGame, gameId, (err, result) => {
                const row = result[0];
                if (row == undefined) {
                    const err2 = new Error('Not Found');
                    callback(err2);
                    return;
                }
                else {
                    db_1.db.query(checkQueryStringReview, reviewId, (err, result) => {
                        const row = result[0];
                        if (row == undefined) {
                            const err2 = new Error('Not Found');
                            callback(err2);
                            return;
                        }
                        else {
                            db_1.db.query(queryString, [reviewId, gameId], (err, result) => {
                                if (err) {
                                    callback(err);
                                }
                                callback(null);
                            });
                        }
                    });
                }
            });
        }
    });
};
exports.deleteOne = deleteOne;
const update = (review, gameId, companyId, reviewId, callback) => {
    const queryString = "UPDATE `review` SET `Comment`=?,`Rating`=?,`UserId`=?,`GameId`=?,`PostDate`=? WHERE id=?";
    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;";
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;";
    const checkQueryStringReview = "SELECT id FROM review WHERE id=?;";
    db_1.db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(err2);
            return;
        }
        else {
            db_1.db.query(checkQueryStringGame, gameId, (err, result) => {
                const row = result[0];
                if (row == undefined) {
                    const err2 = new Error('Not Found');
                    callback(err2);
                    return;
                }
                else {
                    db_1.db.query(checkQueryStringReview, reviewId, (err, result) => {
                        const row = result[0];
                        if (row == undefined) {
                            const err2 = new Error('Not Found');
                            callback(err2);
                            return;
                        }
                        else {
                            db_1.db.query(queryString, [review.comment, review.rating, review.user.id, gameId, review.postDate, reviewId], (err, result) => {
                                if (err) {
                                    callback(err);
                                }
                                callback(null);
                            });
                        }
                    });
                }
            });
        }
    });
};
exports.update = update;
