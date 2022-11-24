import mysql from "mysql";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: 3306,
  /*
  ssl:{
    rejectUnauthorized: true,
    ca:fs.readFileSync(__dirname+"/DigiCertGlobalRootCA.crt.pem")}*/
});