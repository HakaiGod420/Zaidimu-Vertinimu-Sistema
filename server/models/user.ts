import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { BasicUser, User } from "../types/user";


export const create = (user: User, callback: Function) => {
    const queryString = "INSERT INTO `user`(`username`, `password`, `email`) VALUES (?,?,?)"
    const checkQueryString = "SELECT `id`FROM `user` WHERE email=?"

    db.query(checkQueryString, user.email, (err, result) => {
        const row = (<RowDataPacket>result)[0]
        if (row != undefined) {
            const err2 = new Error('User already exist with this email')
            callback(err2)
            return;
        }
        else {
            db.query(
                queryString,
                [user.nickname, user.password, user.email],
                (err, result) => {
                    console.log(result)
                    if (err) {
                        callback(err);
                        return;
                    };
                    const insertId = (<OkPacket>result).insertId;
                    callback(null, insertId);
                }
            );
        }
    });
};


export const findOne = (email: string, callback: Function) => {

    const queryString = "SELECT `id`, `username`, `password`, `email`, `isAdmin` FROM `user` WHERE email=?;"

    db.query(queryString, email, (err, result) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];

        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        }

        let checkRole = false;
        if (row.isAdmin == 1) {
            checkRole = true;
        }
        const user: User = {
            user_id: row.id,
            nickname: row.username,
            password: row.password,
            email: row.email,
            isAdmin: checkRole,
            token: "",
        }
        callback(null, user);
    });
}