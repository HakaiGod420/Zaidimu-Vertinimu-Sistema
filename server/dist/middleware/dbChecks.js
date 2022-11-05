"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfEditingSelectedUser = void 0;
const db_1 = require("../db");
const checkIfEditingSelectedUser = (reviewId, userId, isAdmin, callback) => {
    const checkQueryStringReviewCorrectUser = "SELECT id FROM review WHERE id=? and UserId=?;";
    db_1.db.query(checkQueryStringReviewCorrectUser, [reviewId, userId], (err, result) => {
        if (isAdmin) {
            callback(true);
            return;
        }
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(false);
            return;
        }
        else {
            callback(true);
            return;
        }
    });
};
exports.checkIfEditingSelectedUser = checkIfEditingSelectedUser;
