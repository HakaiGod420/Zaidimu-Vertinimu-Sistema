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
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const reviewModel = __importStar(require("../models/review"));
const reviewRouter = express_1.default.Router({ mergeParams: true });
exports.reviewRouter = reviewRouter;
reviewRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var isNumberCompanyId = /^[0-9]+$/.test(req.params.companyId);
    var isNumberGameId = /^[0-9]+$/.test(req.params.gameId);
    if (!isNumberCompanyId || !isNumberGameId) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const companyId = Number(req.params.companyId);
    const gameId = Number(req.params.gameId);
    reviewModel.findAll(gameId, companyId, (err, orders) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
            else {
                return res.status(500).json({ "errorMessage": err.message });
            }
        }
        res.status(200).json({ "data": orders });
    });
}));
reviewRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var isNumberCompanyId = /^[0-9]+$/.test(req.params.companyId);
    var isNumberGameId = /^[0-9]+$/.test(req.params.gameId);
    var isNumberReviewId = /^[0-9]+$/.test(req.params.id);
    if (!isNumberCompanyId || !isNumberGameId || !isNumberReviewId) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const reviewId = Number(req.params.id);
    const gameId = Number(req.params.gameId);
    const companyId = Number(req.params.companyId);
    reviewModel.findOne(reviewId, gameId, companyId, (err, review) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
            else {
                return res.status(500).json({ "errorMessage": err.message });
            }
        }
        res.status(200).json({ "data": review });
    });
}));
reviewRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var isNumberCompanyId = /^[0-9]+$/.test(req.params.companyId);
    var isNumberGameId = /^[0-9]+$/.test(req.params.gameId);
    ;
    if (!isNumberCompanyId || !isNumberGameId) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const gameId = Number(req.params.gameId);
    const companyId = Number(req.params.companyId);
    const newReview = req.body;
    reviewModel.create(newReview, gameId, companyId, (err, reviewId) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
            else if (err.message == 'Empty User ID') {
                return res.status(400).json({ "errorMessage": err.message });
            }
            else {
                return res.status(500).json({ "errorMessage": err.message });
            }
        }
        res.status(200).json({ "reviewID": reviewId });
    });
}));
reviewRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var isNumberCompanyId = /^[0-9]+$/.test(req.params.companyId);
    var isNumberGameId = /^[0-9]+$/.test(req.params.gameId);
    var isNumberReviewId = /^[0-9]+$/.test(req.params.id);
    if (!isNumberCompanyId || !isNumberGameId || !isNumberReviewId) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const gameId = Number(req.params.gameId);
    const companyId = Number(req.params.companyId);
    const reviewId = Number(req.params.id);
    reviewModel.deleteOne(reviewId, gameId, companyId, (err) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
            else {
                return res.status(500).json({ "errorMessage": err.message });
            }
        }
        res.status(204).send();
    });
}));
reviewRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = req.body;
    reviewModel.update(review, (err) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send();
    });
}));
reviewRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json({ message: "Method not allowed" });
}));
reviewRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json({ message: "Method not allowed" });
}));
reviewRouter.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json({ message: "Method not allowed" });
}));
reviewRouter.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json({ message: "Method not allowed" });
}));
reviewRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json({ message: "Not found" });
}));
