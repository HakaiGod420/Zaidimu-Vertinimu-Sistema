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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRouter = void 0;
const express_1 = __importDefault(require("express"));
const gameModel = __importStar(require("../models/game"));
const gameRouter = express_1.default.Router({ mergeParams: true });
exports.gameRouter = gameRouter;
gameRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newGame = req.body;
    gameModel.create(newGame, (err, gameId) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "gameID": gameId });
    });
}));
gameRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyId = Number(req.params.companyId);
    gameModel.findAll(companyId, (err, orders) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "data": orders });
    });
}));
gameRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = Number(req.params.id);
    const companyId = Number(req.params.companyId);
    gameModel.findOne(gameId, companyId, (err, order) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    });
}));
gameRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = Number(req.params.id);
    gameModel.deleteOne(gameId, (err) => {
        if (err) {
            return res.status(404).json({ "message": err.message });
        }
        res.status(204).send();
    });
}));
gameRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const game = req.body;
    gameModel.update(game, (err) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send();
    });
}));
