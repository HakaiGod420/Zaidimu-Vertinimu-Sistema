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
exports.companyRouter = void 0;
const express_1 = __importDefault(require("express"));
const companyModel = __importStar(require("../models/company"));
const companyRouter = express_1.default.Router();
exports.companyRouter = companyRouter;
const auth = require("../middleware/auth");
const authForAdmin = require("../middleware/authForAdmin");
companyRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    companyModel.findAll((err, companies) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ companies });
    });
}));
companyRouter.post("/", authForAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCompany = req.body;
    if (newCompany.creationDate == undefined || newCompany.image == undefined || newCompany.name == undefined) {
        return res.status(400).json({ "message": 'Bad Request' });
    }
    if (!Date.parse(newCompany.creationDate.toString())) {
        return res.status(400).json({ "message": "Bad date format" });
    }
    companyModel.create(newCompany, (err, id) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(201).json({ "id": id });
    });
}));
companyRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var isNumber = /^[0-9]+$/.test(req.params.id);
    if (!isNumber) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const companyId = Number(req.params.id);
    companyModel.findOne(companyId, (err, company) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
        }
        res.status(200).json({ "data": company });
    });
}));
companyRouter.put("/:id", authForAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var isNumber = /^[0-9]+$/.test(req.params.id);
    if (!isNumber) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const company = req.body;
    if (company.creationDate == undefined || company.image == undefined || company.name == undefined) {
        return res.status(400).json({ "message": 'Bad Request' });
    }
    if (!Date.parse(company.creationDate.toString())) {
        return res.status(400).json({ "message": "Bad date format" });
    }
    //if(company.creationDate.)
    const companyId = Number(req.params.id);
    companyModel.update(company, companyId, (err) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
        }
        res.status(204).send();
    });
}));
companyRouter.delete("/:id", authForAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var isNumber = /^[0-9]+$/.test(req.params.id);
    if (!isNumber) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const companyId = Number(req.params.id);
    companyModel.deleteOne(companyId, (err) => {
        if (err) {
            if (err.message == 'Not Found') {
                res.status(404).json({ "message": err.message });
            }
        }
        else {
            res.status(204).send();
        }
    });
}));
companyRouter.delete("/", authForAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json({ message: "Method not allowed" });
}));
companyRouter.put("/", authForAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json({ message: "Method not allowed" });
}));
companyRouter.post("/:id", authForAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json({ message: "Method not allowed" });
}));
companyRouter.patch("/", authForAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json({ message: "Method not allowed" });
}));
companyRouter.patch("/:id", authForAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json({ message: "Not found" });
}));
