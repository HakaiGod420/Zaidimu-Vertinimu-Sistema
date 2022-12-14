"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const companyRouter_1 = require("./routes/companyRouter");
const gameRouter_1 = require("./routes/gameRouter");
const reviewRouter_1 = require("./routes/reviewRouter");
const userRouter_1 = require("./routes/userRouter");
const app = (0, express_1.default)();
dotenv.config();
let cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({ error: "Bad Request. Check JSON format" });
    }
    else {
        next();
    }
});
companyRouter_1.companyRouter.use('/:companyId/games', gameRouter_1.gameRouter);
gameRouter_1.gameRouter.use('/:gameId/reviews', reviewRouter_1.reviewRouter);
app.use("/companies", companyRouter_1.companyRouter);
app.use('/users', userRouter_1.userRouter);
app.use(function (req, res, next) {
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }
});
app.get('*', function (req, res) {
    res.status(404).json({ message: "Page was not found" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
