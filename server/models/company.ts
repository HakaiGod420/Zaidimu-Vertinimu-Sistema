import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { BasicCompany, Company } from "../types/company";


export const create = (company: Company, callback: Function) => {
    const queryString = "INSERT INTO `company`(`Name`, `CreationDate`, `Image`) VALUES (?, ?, ?)"
    db.query(
        queryString,
        [company.name, company.creationDate, company.image],
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

export const findOne = (companyID: number, callback: Function) => {

    const queryString = `SELECT id,Name, CreationDate, Image FROM company WHERE id=?`

    db.query(queryString, companyID, (err, result) => {
        if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];

        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        }

        const company: Company = {
            id: row.id,
            name: row.Name,
            creationDate: row.CreationDate,
            image: row.Image
        }
        callback(null, company);
    });
}

export const findAll = (callback: Function) => {
    const queryString = "SELECT `id`, `Name`, `CreationDate`, `Image` FROM `company`"

    db.query(queryString, (err, result) => {
        if (err) { callback(err) }

        const rows = <RowDataPacket[]>result;
        const orders: Company[] = [];

        rows.forEach(row => {
            const order: Company = {
                id: row.id,
                name: row.Name,
                creationDate: row.CreationDate,
                image: row.Image
            }
            orders.push(order);
        });
        callback(null, orders);
    });
}

export const update = (company: Company, companyId: number, callback: Function) => {
    const queryString = "UPDATE company SET Name=?,CreationDate=?,Image=? WHERE id=?";

    const checkQueryString = "SELECT id FROM company WHERE id=?;"

    db.query(checkQueryString, companyId, (err, result) => {
        const row = (<RowDataPacket>result)[0]
        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        }
        else {
            db.query(
                queryString,
                [company.name, company.creationDate, company.image, companyId],
                (err, result) => {
                    if (err) { callback(err) }
                    callback(null);
                }
            );
        }
    });

}

export const deleteOne = (companyID: number, callback: Function) => {
    //First check if exists


    const checkQueryString = "SELECT id FROM company WHERE id=?;"

    db.query(checkQueryString, companyID, (err, result) => {
        const row = (<RowDataPacket>result)[0]
        if (row == undefined) {
            const err2 = new Error('Not Found')
            callback(err2)
            return;
        }
        else {
            const queryString = "DELETE FROM `company` WHERE id=?"
            db.query(queryString, companyID, (err, result) => {
                if (err) { callback(err) }
                callback(null);
            });
        }
    });
}