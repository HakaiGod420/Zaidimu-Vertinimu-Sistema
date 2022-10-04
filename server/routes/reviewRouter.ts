import express, { Request, Response } from "express";
import * as reviewModel from "../models/review"
import { Review,BasicReview,ReviewWithDetails } from "../types/review";
const reviewRouter = express.Router({ mergeParams: true });


reviewRouter.get("/", async (req: Request, res: Response) => {
    const gameId: number = Number(req.params.gameId);
    console.log(gameId)
    reviewModel.findAll(gameId, (err: Error, orders: Review[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "data": orders });
    });
});

export { reviewRouter };