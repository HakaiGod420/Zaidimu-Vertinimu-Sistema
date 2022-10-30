import express, { Request, Response } from "express";
import * as userModel from "../models/user";
import { BasicUser, User } from '../types/user'
const userRouter = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

userRouter.post("/register", async (req: Request, res: Response) => {
    const newUser: User = req.body;

    if (newUser.nickname == undefined || newUser.password == undefined || newUser.email == undefined) {
        return res.status(400).json({ "message": 'Bad Request' });
    }

    //Check if exist user

    let encryptedPassword = await bcrypt.hash(newUser.password, 10);

    newUser.password = encryptedPassword;

    userModel.create(newUser, (err: Error, id: number) => {
        if (err) {
            if (err.message == 'User already exist with this email') {
                return res.status(500).json({ "message": err.message });
            }
        }
        newUser.user_id = id;
        newUser.isAdmin = false

        const token = jwt.sign(
            { user_id: newUser.user_id, email: newUser.email, isAdmin: newUser.isAdmin },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        newUser.token = token;
        return res.status(201).json(newUser);
    });
});


userRouter.post("/login", async (req: Request, res: Response) => {
    const user: User = req.body;
    if (user.email == undefined || user.password == undefined) {
        return res.status(400).json({ "message": 'Bad Request' });
    }

    let writenPass = user.password;


    userModel.findOne(user.email, async (err: Error, user: User) => {
        if (err) {
            if (err.message == 'Not Found') {

                return res.status(404).json({ "message": err.message });
            }
        }

        if (!await bcrypt.compare(writenPass, user.password)) {
            return res.status(400).json({ "error:": "Invalid Credentials" });
        }
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email, IsAdmin: user.isAdmin },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;
        res.status(200).json({ user });
    })

});

export { userRouter }