import express, { Request, Response } from "express";
import * as reviewModel from "../models/review"
import { Review, BasicReview, ReviewWithDetails } from "../types/review";
const reviewRouter = express.Router({ mergeParams: true });


reviewRouter.get("/", async (req: Request, res: Response) => {
    const gameId: number = Number(req.params.gameId);
    reviewModel.findAll(gameId, (err: Error, orders: Review[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "data": orders });
    });
});

reviewRouter.get("/:id", async (req: Request, res: Response) => {
    const reviewId: number = Number(req.params.id);
    const gameId: number = Number(req.params.gameId);
    reviewModel.findOne(reviewId, gameId, (err: Error, review: Review) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": review });
    })
});


reviewRouter.post("/", async (req: Request, res: Response) => {
    const newReview: Review = req.body;
    reviewModel.create(newReview, (err: Error, reviewId: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).json({ "gameID": reviewId });
    });
});

reviewRouter.delete("/:id", async (req: Request, res: Response) => {
    const reviewId: number = Number(req.params.id);
    reviewModel.deleteOne(reviewId, (err: Error) => {
        if (err) {
            return res.status(404).json({ "message": err.message });
        }
        res.status(204).send();
    })
});

reviewRouter.put("/:id", async (req: Request, res: Response) => {
    const review: Review = req.body;
    reviewModel.update(review, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send();
    })
});

export { reviewRouter };