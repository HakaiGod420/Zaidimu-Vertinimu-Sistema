import express, { Request, Response } from "express";
import * as gameModel from "../models/game"
import { Game, BasicGame, GameWithDetails } from "../types/game";
const gameRouter = express.Router({ mergeParams: true });



gameRouter.post("/", async (req: Request, res: Response) => {
    var isNumber = /^[0-9]+$/.test(req.params.companyId);
    if (!isNumber) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const companyId: number = Number(req.params.companyId);
    const newGame: Game = req.body;

    if(newGame.name == undefined || newGame.summary == undefined || newGame.releaseDate == undefined || newGame.startingPrice == undefined || newGame.thumbnail == undefined){
        return res.status(400).json({ "message": "Bad Request format" });
    }

    if(!Date.parse(newGame.releaseDate.toString())){
        return res.status(400).json({ "message": "Bad date format" });
    }else if(!Number.parseFloat(newGame.startingPrice.toString())){
        return res.status(400).json({ "message": "Bad starting price format" });
    }

    gameModel.create(newGame, companyId, (err: Error, gameId: number) => {

        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            } else {
                return res.status(500).json({ "message": err.message });
            }
        }
        res.status(201).json({ "gameID": gameId });
    });
});

gameRouter.get("/", async (req: Request, res: Response) => {
    var isNumber = /^[0-9]+$/.test(req.params.companyId);
    if (!isNumber) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const companyId: number = Number(req.params.companyId);
    gameModel.findAll(companyId, (err: Error, orders: Game[]) => {
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


gameRouter.get("/:id", async (req: Request, res: Response) => {

    var isNumber = /^[0-9]+$/.test(req.params.id);
    var isNumberGameId = /^[0-9]+$/.test(req.params.companyId);
    if (!isNumber) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    if (!isNumberGameId) {
        return res.status(400).json({ "message": "Bad Request format" });
    }

    const gameId: number = Number(req.params.id);
    const companyId: number = Number(req.params.companyId);
    gameModel.findOne(gameId, companyId, (err: Error, game: Game) => {
        if (err) {
            if (err.message == 'Not found game with this id') {
                return res.status(404).json({ "message": err.message });
            } else if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            } else {
                return res.status(500).json({ "message": err.message });
            }

        }
        res.status(200).json({ "data": game });
    })
});

gameRouter.delete("/:id", async (req: Request, res: Response) => {
    var isNumber = /^[0-9]+$/.test(req.params.id);
    var isNumberGameId = /^[0-9]+$/.test(req.params.companyId);
    if (!isNumber) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    if (!isNumberGameId) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const companyId: number = Number(req.params.companyId);
    const gameId: number = Number(req.params.id);

    gameModel.deleteOne(gameId, companyId, (err: Error) => {
        if (err) {
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            } else {
                return res.status(500).json({ "message": err.message });
            }

        }
        res.status(204).send();
    })
});

gameRouter.put("/:id", async (req: Request, res: Response) => {
    var isNumber = /^[0-9]+$/.test(req.params.id);
    var isNumberGameId = /^[0-9]+$/.test(req.params.companyId);
    if (!isNumber) {
        return res.status(400).json({ "message": "Bad Request format" });
    }
    if (!isNumberGameId) {
        return res.status(400).json({ "message": "Bad Request format" });
    }

    const companyId: number = Number(req.params.companyId);
    const gameId: number = Number(req.params.id);

    const game: Game = req.body;

    if(game.name == undefined || game.summary == undefined || game.releaseDate == undefined || game.startingPrice == undefined || game.thumbnail == undefined){
        return res.status(400).json({ "message": "Bad Request format" });
    }

    if(!Date.parse(game.releaseDate.toString())){
        return res.status(400).json({ "message": "Bad date format" });
    }else if(!Number.parseFloat(game.startingPrice.toString())){
        return res.status(400).json({ "message": "Bad starting price format" });
    }
    
    gameModel.update(game, gameId, companyId, (err: Error) => {
        if (err) {
            if (err.message == 'Not found game with this id') {
                return res.status(404).json({ "message": err.message });
            } else if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            } else {
                return res.status(500).json({ "message": err.message });
            }
        }
        res.status(204).send();
    })
});


gameRouter.delete("/", async (req: Request, res: Response) => {

    return res.status(405).json({ message: "Method not allowed" })
})

gameRouter.put("/", async (req: Request, res: Response) => {

    return res.status(405).json({ message: "Method not allowed" })
})

gameRouter.patch("/", async (req: Request, res: Response) => {

    return res.status(405).json({ message: "Method not allowed" })
})

gameRouter.patch("/:id", async (req: Request, res: Response) => {

    return res.status(404).json({ message: "Not found" })
})

gameRouter.post("/:id", async (req: Request, res: Response) => {

    return res.status(405).json({ message: "Method not allowed" })
})

export { gameRouter };