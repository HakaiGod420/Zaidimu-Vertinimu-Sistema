"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../db");
const create = (company, callback) => {
    const queryString = "INSERT INTO `company`(`Name`, `CreationDate`, `Image`) VALUES (?, ?, ?)";
    db_1.db.query(queryString, [company.name, company.creationDate, company.image], (err, result) => {
        console.log(result);
        if (err) {
            callback(err);
            return;
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (companyID, callback) => {
    const queryString = `SELECT id,Name, CreationDate, Image FROM company WHERE id=?`;
    db_1.db.query(queryString, companyID, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(err2);
            return;
        }
        const company = {
            id: row.id,
            name: row.Name,
            creationDate: row.CreationDate,
            image: row.Image
        };
        callback(null, company);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = "SELECT `id`, `Name`, `CreationDate`, `Image` FROM `company`";
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const orders = [];
        rows.forEach(row => {
            const order = {
                id: row.id,
                name: row.Name,
                creationDate: row.CreationDate,
                image: row.Image
            };
            orders.push(order);
        });
        callback(null, orders);
    });
};
exports.findAll = findAll;
const update = (company, companyId, callback) => {
    const queryString = "UPDATE company SET Name=?,CreationDate=?,Image=? WHERE id=?";
    const checkQueryString = "SELECT id FROM company WHERE id=?;";
    db_1.db.query(checkQueryString, companyId, (err, result) => {
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(err2);
            return;
        }
        else {
            db_1.db.query(queryString, [company.name, company.creationDate, company.image, companyId], (err, result) => {
                if (err) {
                    callback(err);
                }
                callback(null);
            });
        }
    });
};
exports.update = update;
const deleteOne = (companyID, callback) => {
    //First check if exists
    const checkQueryString = "SELECT id FROM company WHERE id=?;";
    db_1.db.query(checkQueryString, companyID, (err, result) => {
        const row = result[0];
        if (row == undefined) {
            const err2 = new Error('Not Found');
            callback(err2);
            return;
        }
        else {
            const queryString = "DELETE FROM `company` WHERE id=?";
            db_1.db.query(queryString, companyID, (err, result) => {
                if (err) {
                    callback(err);
                }
                callback(null);
            });
        }
    });
};
exports.deleteOne = deleteOne;
