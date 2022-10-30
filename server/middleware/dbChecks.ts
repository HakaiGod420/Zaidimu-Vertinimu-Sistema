import { db } from "../db";
import { Review, BasicReview, ReviewWithDetails } from "../types/review";
import { OkPacket, RowDataPacket } from "mysql2";


export const checkIfEditingSelectedUser = (reviewId: number, userId: number, isAdmin: boolean, callback: Function) => {
    const checkQueryStringReviewCorrectUser = "SELECT id FROM review WHERE id=? and UserId=?;"

    db.query(checkQueryStringReviewCorrectUser, [reviewId, userId], (err, result) => {
        if (isAdmin) {
            callback(true);
            return;
        }
        const row = (<RowDataPacket>result)[0]
        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(false)
            return;
        } else {
            callback(true);
            return
        }
    });
}