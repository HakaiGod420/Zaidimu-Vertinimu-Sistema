import express, { Request, Response } from "express";
import * as reviewModel from "../models/review"
import { Review, BasicReview, ReviewWithDetails } from "../types/review";
const reviewRouter = express.Router({ mergeParams: true });


reviewRouter.get("/", async (req: Request, res: Response) => {
    var isNumberCompanyId = /^[0-9]+$/.test(req.params.companyId);
    var isNumberGameId = /^[0-9]+$/.test(req.params.gameId);
    if(!isNumberCompanyId || !isNumberGameId){
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const companyId: number = Number(req.params.companyId);
    const gameId: number = Number(req.params.gameId);
    reviewModel.findAll(gameId,companyId, (err: Error, orders: Review[]) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            } else {
                return res.status(500).json({ "errorMessage": err.message });
            }
        }
        res.status(200).json({ "data": orders });
    });
});

reviewRouter.get("/:id", async (req: Request, res: Response) => {
    var isNumberCompanyId = /^[0-9]+$/.test(req.params.companyId);
    var isNumberGameId = /^[0-9]+$/.test(req.params.gameId);
    var isNumberReviewId= /^[0-9]+$/.test(req.params.id);
    if(!isNumberCompanyId || !isNumberGameId || !isNumberReviewId){
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const reviewId: number = Number(req.params.id);
    const gameId: number = Number(req.params.gameId);
    const companyId: number = Number(req.params.companyId);
    reviewModel.findOne(reviewId, gameId,companyId, (err: Error, review: Review) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            } else {
                return res.status(500).json({ "errorMessage": err.message });
            }
        }
        res.status(200).json({ "data": review });
    })
});


reviewRouter.post("/", async (req: Request, res: Response) => {
    var isNumberCompanyId = /^[0-9]+$/.test(req.params.companyId);
    var isNumberGameId = /^[0-9]+$/.test(req.params.gameId);;
    if(!isNumberCompanyId || !isNumberGameId){
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const gameId: number = Number(req.params.gameId);
    const companyId: number = Number(req.params.companyId);
    const newReview: Review = req.body;
    reviewModel.create(newReview,gameId,companyId, (err: Error, reviewId: number) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
            else if(err.message == 'Empty User ID'){
                return res.status(400).json({ "errorMessage": err.message });
            }
            else {
                return res.status(500).json({ "errorMessage": err.message });
            }
        }
        res.status(200).json({ "reviewID": reviewId });
    });
});

reviewRouter.delete("/:id", async (req: Request, res: Response) => {
    var isNumberCompanyId = /^[0-9]+$/.test(req.params.companyId);
    var isNumberGameId = /^[0-9]+$/.test(req.params.gameId);
    var isNumberReviewId= /^[0-9]+$/.test(req.params.id);
    if(!isNumberCompanyId || !isNumberGameId || !isNumberReviewId){
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const gameId: number = Number(req.params.gameId);
    const companyId: number = Number(req.params.companyId);
    const reviewId: number = Number(req.params.id);
    reviewModel.deleteOne(reviewId,gameId,companyId, (err: Error) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
            else {
                return res.status(500).json({ "errorMessage": err.message });
            }
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


reviewRouter.delete("/", async (req: Request, res: Response) => {
    
    return res.status(405).json({message:"Method not allowed"})
})

reviewRouter.put("/", async (req: Request, res: Response) => {
    
    return res.status(405).json({message:"Method not allowed"})
})

reviewRouter.post("/:id", async (req: Request, res: Response) => {
    
    return res.status(405).json({message:"Method not allowed"})
})

reviewRouter.patch("/", async (req: Request, res: Response) => {

    return res.status(405).json({ message: "Method not allowed" })
})

reviewRouter.patch("/:id", async (req: Request, res: Response) => {

    return res.status(404).json({ message: "Not found" })
})

export { reviewRouter };