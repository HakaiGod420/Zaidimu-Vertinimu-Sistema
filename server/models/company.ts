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
            if (err) { callback(err);
                 return; };
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

        if(row == undefined){
            const err2 = new Error('Where is not company with selected id')
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

export const update = (company: Company, callback: Function) => {
    const queryString = "UPDATE company SET Name=?,CreationDate=?,Image=? WHERE id=?";

    db.query(
        queryString,
        [company.name, company.creationDate,company.image, company.id],
        (err, result) => {
            if (err) { callback(err) }
            callback(null);
        }
    );
}

export const deleteOne = (companyID: number, callback: Function) => {

    const queryString = "DELETE FROM `company` WHERE id=?"

    db.query(queryString, companyID, (err, result) => {
        if (err) { callback(err) }
        callback(null)
    });
}