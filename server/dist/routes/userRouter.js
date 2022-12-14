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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userModel = __importStar(require("../models/user"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    if (newUser.username == undefined || newUser.password == undefined || newUser.email == undefined) {
        return res.status(400).json({ "message": 'Bad Request' });
    }
    //Check if exist user
    let encryptedPassword = yield bcrypt.hash(newUser.password, 10);
    newUser.password = encryptedPassword;
    userModel.create(newUser, (err, id) => {
        if (err) {
            if (err.message == 'User already exist with this email') {
                return res.status(500).json({ "message": err.message });
            }
        }
        newUser.user_id = id;
        newUser.isAdmin = false;
        const token = jwt.sign({ user_id: newUser.user_id, email: newUser.email, isAdmin: newUser.isAdmin }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        newUser.token = token;
        return res.status(201).json(newUser);
    });
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    if (user.email == undefined || user.password == undefined) {
        return res.status(400).json({ "message": 'Bad Request' });
    }
    let writenPass = user.password;
    userModel.findOne(user.email, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
        }
        if (!(yield bcrypt.compare(writenPass, user.password))) {
            return res.status(400).json({ "error:": "Invalid Credentials" });
        }
        const token = jwt.sign({ user_id: user.user_id, email: user.email, IsAdmin: user.isAdmin }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        user.token = token;
        res.status(200).json({ user });
    }));
}));
