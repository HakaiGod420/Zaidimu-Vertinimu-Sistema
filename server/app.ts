import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {orderRouter} from "./routes/orderRouter";
import {companyRouter} from "./routes/companyRouter";
import {gameRouter} from "./routes/gameRouter";

const app = express();
dotenv.config();
let cors = require("cors");


app.use(cors());
app.use(bodyParser.json());
app.use("/orders", orderRouter);
companyRouter.use('/:companyId/games',gameRouter)
app.use("/companies", companyRouter);

app.listen(3001, () => {
console.log("Node server started running at http://localhost:"+3001);
});