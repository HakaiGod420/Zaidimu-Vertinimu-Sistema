import { db } from "../db";
import { Review, BasicReview, ReviewWithDetails } from "../types/review";
import { OkPacket, RowDataPacket } from "mysql2";
import * as dbCheck from "../middleware/dbChecks"



export const findAll = (gameID: number, companyId: number, callback: Function) => {
    const queryString = "SELECT review.id,review.Comment,review.Rating,review.UserId,review.GameId,review.PostDate,game.id as'GameID',user.username FROM `review`  INNER JOIN game on GameId=game.id INNER JOIN user on UserId=user.id WHERE GameId=? and game.CompanyID = ?;"

    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;"
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;"


    db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = (<RowDataPacket>result)[0];

        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        } else {
            db.query(checkQueryStringGame, gameID, (err, result) => {
                const row = (<RowDataPacket>result)[0];

                if (row == undefined) {
                    const err2 = new Error('Not Found')
                    callback(err2)
                    return;
                } else {
                    db.query(queryString, [gameID, companyId], (err, result) => {
                        if (err) { callback(err) }

                        const rows = <RowDataPacket[]>result;
                        const reviews: Review[] = [];
                        rows.forEach(row => {
                            const game: Review = {
                                id: row.id,
                                comment: row.Comment,
                                rating: row.Rating,
                                postDate: row.PostDate,
                                game: {
                                    id: row.GameId
                                },
                                user: {
                                    user_id: row.UserId,
                                    username: row.username,
                                    
                                }
                            }
                            reviews.push(game);
                        });
                        callback(null, reviews);
                    });
                }
            });
        }
    });


}


export const findOne = (reviewId: number, gameId: number, companyId: number, callback: Function) => {

    const queryString = "SELECT review.id,review.Comment,review.Rating,review.UserId,review.GameId,review.PostDate,game.id as'GameID',user.username FROM `review`  INNER JOIN game on GameId=game.id INNER JOIN user on UserId=user.id WHERE GameId=? and game.CompanyID = ? and review.id=?;"
    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;"
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;"


    db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = (<RowDataPacket>result)[0];

        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        } else {
            db.query(checkQueryStringGame, gameId, (err, result) => {
                const row = (<RowDataPacket>result)[0];

                if (row == undefined) {
                    const err2 = new Error('Not Found')
                    callback(err2)
                    return;
                } else {
                    db.query(queryString, [gameId, companyId, reviewId], (err, result) => {
                        if (err) { callback(err) }

                        const row = (<RowDataPacket>result)[0];

                        if (row == undefined) {
                            const err2 = new Error('Not Found')
                            callback(err2)
                            return;
                        }

                        const review: Review = {
                            id: row.reviewID,
                            comment: row.Comment,
                            rating: row.Rating,
                            postDate: row.PostDate,
                            user: {
                                user_id: row.UserId,
                                username: row.username,
                            },
                            game: {
                                id: row.GameId
                            }
                        }
                        callback(null, review);
                    });
                }
            });
        }
    });





}

export const create = (review: Review, gameId: number, companyId: number, callback: Function) => {
    const queryString = "INSERT INTO `review`(`Comment`, `Rating`, `UserId`, `GameId`, `PostDate`) VALUES (?,?,?,?,?)"

    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;"
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;"

    if (review.user == undefined) {
        const err2 = new Error('Empty User ID')
        callback(err2)
        return;
    }
    db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = (<RowDataPacket>result)[0];

        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        } else {
            db.query(checkQueryStringGame, gameId, (err, result) => {
                const row = (<RowDataPacket>result)[0];

                if (row == undefined) {
                    const err2 = new Error('Not Found')
                    callback(err2)
                    return;
                } else {
                    db.query(
                        queryString,
                        [review.comment, review.rating, review.user.user_id, gameId, review.postDate],
                        (err, result) => {
                            if (err) { callback(err); return };

                            const insertId = (<OkPacket>result).insertId;
                            callback(null, insertId);
                        }
                    );
                }
            });
        }
    });


};

export const deleteOne = (reviewId: number, gameId: number, companyId: number, userId: number, isAdmin: boolean, callback: Function) => {

    const queryString = "DELETE FROM `review` WHERE id=? and GameId=?"
    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;"
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;"
    const checkQueryStringReview = "SELECT id FROM review WHERE id=?;"

    db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = (<RowDataPacket>result)[0];

        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        } else {
            db.query(checkQueryStringGame, gameId, (err, result) => {
                const row = (<RowDataPacket>result)[0];

                if (row == undefined) {
                    const err2 = new Error('Not Found')
                    callback(err2)
                    return;
                } else {
                    db.query(checkQueryStringReview, reviewId, (err, result) => {
                        const row = (<RowDataPacket>result)[0];

                        if (row == undefined) {
                            const err2 = new Error('Not Found')
                            callback(err2)
                            return;
                        } else {

                            dbCheck.checkIfEditingSelectedUser(reviewId, userId, isAdmin, (check: Boolean) => {
                                if (check) {
                                    db.query(queryString, [reviewId, gameId], (err, result) => {
                                        if (err) { callback(err) }
                                        callback(null)
                                    });
                                } else {
                                    const err2 = new Error('Forbiden')
                                    callback(err2)
                                    return;
                                }
                            });

                        }
                    });
                }
            });
        }
    });



}


export const update = (review: Review, gameId: number, companyId: number, reviewId: number, userId: number, isAdmin: boolean, callback: Function) => {
    const queryString = "UPDATE `review` SET `Comment`=?,`Rating`=?,`GameId`=?,`PostDate`=? WHERE id=?";

    const checkQueryStringCompany = "SELECT id FROM company WHERE id=?;"
    const checkQueryStringGame = "SELECT id FROM game WHERE id=?;"
    const checkQueryStringReview = "SELECT id FROM review WHERE id=?;"



    db.query(checkQueryStringCompany, companyId, (err, result) => {
        const row = (<RowDataPacket>result)[0];

        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        } else {
            db.query(checkQueryStringGame, gameId, (err, result) => {
                const row = (<RowDataPacket>result)[0];

                if (row == undefined) {
                    const err2 = new Error('Not Found')
                    callback(err2)
                    return;
                } else {
                    db.query(checkQueryStringReview, reviewId, (err, result) => {
                        const row = (<RowDataPacket>result)[0];

                        if (row == undefined) {
                            const err2 = new Error('Not Found')
                            callback(err2)
                            return;
                        } else {
                            dbCheck.checkIfEditingSelectedUser(reviewId, userId, isAdmin, (check: Boolean) => {
                                if (check) {
                                    db.query(
                                        queryString,
                                        [review.comment, review.rating, gameId, review.postDate, reviewId],
                                        (err, result) => {
                                            if (err) { callback(err) }
                                            callback(null);
                                        }
                                    );
                                } else {
                                    const err2 = new Error('Forbiden')
                                    callback(err2)
                                    return;
                                }
                            })

                        }
                    });
                }
            });
        }
    });


}