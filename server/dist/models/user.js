"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.create = void 0;
const db_1 = require("../db");
const create = (user, callback) => {
    const queryString = "INSERT INTO `user`(`username`, `password`, `email`) VALUES (?,?,?)";
    const checkQueryString = "SELECT `id`FROM `user` WHERE email=?";
    db_1.db.query(checkQueryString, user.email, (err, result) => {
        const row = result[0];
        if (row != undefined) {
            const err2 = new Error('User already exist with this email');
            callback(err2);
            return;
        }
        else {
            db_1.db.query(queryString, [user.username, user.password, user.email], (err, result) => {
                console.log(result);
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
};
exports.create = create;
const findOne = (email, callback) => {
    const queryString = "SELECT `id`, `username`, `password`, `email`, `isAdmin` FROM `user` WHERE email=?;";
    db_1.db.query(queryString, email, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(err2);
            return;
        }
        let checkRole = false;
        if (row.isAdmin == 1) {
            checkRole = true;
        }
        const user = {
            username: row.username,
            user_id: row.id,
            password: row.password,
            email: row.email,
            isAdmin: checkRole,
            token: "",
        };
        callback(null, user);
    });
};
exports.findOne = findOne;
