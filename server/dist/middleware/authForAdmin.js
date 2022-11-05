"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config = process.env;
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ "error": "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        if (decoded.IsAdmin != true) {
            return res.status(403).json({ "error": "Permissions not granted" });
        }
        req.body.user = decoded;
    }
    catch (err) {
        return res.status(401).json({ "error": "Invalid Token" });
    }
    return next();
};
module.exports = verifyToken;
