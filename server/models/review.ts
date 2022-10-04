import { db } from "../db";
import { Review, BasicReview, ReviewWithDetails } from "../types/review";
import { OkPacket, RowDataPacket } from "mysql2";



export const findAll = (gameID: number, callback: Function) => {
    const queryString = "SELECT * FROM `review` WHERE GameId=?"
    db.query(queryString, gameID, (err, result) => {
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
                    id: row.UserId
                }
            }
            reviews.push(game);
        });
        callback(null, reviews);
    });
}


export const findOne = (reviewId: number, gameId: number, callback: Function) => {

    const queryString = "SELECT * FROM `review` WHERE GameId=? AND id=?"

    db.query(queryString, [gameId, reviewId], (err, result) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];

        if (row == undefined) {
            const err2 = new Error('Where is no review with selected ID')
            callback(err2)
            return;
        }

        const review: Review = {
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
        }
        callback(null, review);
    });



}

export const create = (review: Review, callback: Function) => {
    const queryString = "INSERT INTO `review`(`Comment`, `Rating`, `UserId`, `GameId`, `PostDate`) VALUES (?,?,?,?,?)"

    if (review.game.id == undefined) {
        const err2 = new Error('No Game ID was selected')
        callback(err2, -1)
        return;
    } else if (review.user.id == undefined) {
        const err2 = new Error('No User ID was selected')
        callback(err2, -1)
        return;
    }

    db.query(
        queryString,
        [review.comment, review.rating, review.user.id, review.game.id, review.postDate],
        (err, result) => {
            if (err) { callback(err); return };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

export const deleteOne = (reviewId: number, callback: Function) => {

    const queryString = "DELETE FROM `review` WHERE id=?"

    db.query(queryString, reviewId, (err, result) => {
        if (err) { callback(err) }
        callback(null)
    });
}


export const update = (review: Review, callback: Function) => {
    const queryString = "UPDATE `review` SET `Comment`=?,`Rating`=?,`UserId`=?,`GameId`=?,`PostDate`=? WHERE id=?";

    db.query(
        queryString,
        [review.comment,review.rating,review.user.id,review.game.id,review.postDate,review.id],
        (err, result) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}