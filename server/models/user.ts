import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { BasicUser, User } from "../types/user";


export const create = (user: User, callback: Function) => {
    const queryString = "INSERT INTO `user`(`username`, `password`, `email`) VALUES (?,?,?)"
    db.query(
        queryString,
        [user.nickname,user.password,user.email],
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
};


export const findOne = (email: string, callback: Function) => {

    const queryString = "SELECT `id`, `username`, `password`, `email`, `role` FROM `user` WHERE email=?;"

    db.query(queryString, email, (err, result) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];

        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        }

        const user: User = {
            id: row.id,
            nickname: row.username,
            password: row.password,
            email: row.email,
            role: row.role,
            token: "",
        }
        callback(null, user);
    });
}