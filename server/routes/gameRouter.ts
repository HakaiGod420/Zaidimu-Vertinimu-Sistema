import express, { Request, Response } from "express";
import * as gameModel from "../models/game"
import { Game, BasicGame, GameWithDetails } from "../types/game";
const gameRouter = express.Router({ mergeParams: true });



gameRouter.post("/", async (req: Request, res: Response) => {
    const newGame: Game = req.body;
    gameModel.create(newGame, (err: Error, gameId: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).json({ "gameID": gameId });
    });
});

gameRouter.get("/", async (req: Request, res: Response) => {
    const companyId: number = Number(req.params.companyId);
    gameModel.findAll(companyId, (err: Error, orders: Game[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "data": orders });
    });
});


gameRouter.get("/:id", async (req: Request, res: Response) => {
    const gameId: number = Number(req.params.id);
    const companyId: number = Number(req.params.companyId);
    gameModel.findOne(gameId, companyId, (err: Error, order: Game) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": order });
    })
});

gameRouter.delete("/:id", async (req: Request, res: Response) => {
    const gameId: number = Number(req.params.id);
    gameModel.deleteOne(gameId, (err: Error) => {
        if (err) {
            return res.status(404).json({ "message": err.message });
        }
        res.status(204).send();
    })
});

gameRouter.put("/:id", async (req: Request, res: Response) => {
    const game: Game = req.body;
    gameModel.update(game, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send();
    })
});

export { gameRouter };