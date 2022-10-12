import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {companyRouter} from "./routes/companyRouter";
import {gameRouter} from "./routes/gameRouter";
import { reviewRouter } from "./routes/reviewRouter";

const app = express();
dotenv.config();
let cors = require("cors");


app.use(cors());
app.use(bodyParser.json());
companyRouter.use('/:companyId/games',gameRouter)
gameRouter.use('/:gameId/reviews',reviewRouter);
app.use("/companies", companyRouter);

app.listen(3001, () => {
console.log("Node server started running at http://localhost:"+3001);
});