import { Console } from "console";
import express, { Request, Response } from "express";
import * as companyModel from "../models/company";
import { Company, BasicCompany } from "../types/company";
const companyRouter = express.Router();

companyRouter.get("/", async (req: Request, res: Response) => {
    companyModel.findAll((err: Error, orders: Company[]) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "data": orders });
    });
})

companyRouter.post("/", async (req: Request, res: Response) => {
    const newCompany: Company = req.body;
    companyModel.create(newCompany, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(201).json({ "id": id });
    });
});

companyRouter.get("/:id", async (req: Request, res: Response) => {
    
    var isNumber = /^[0-9]+$/.test(req.params.id);
    if(!isNumber){
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const companyId: number = Number(req.params.id);
    companyModel.findOne(companyId, (err: Error, company: Company) => {
        if (err) {
            if (err.message == 'Not Found') {

                return res.status(404).json({ "message": err.message });
            }
        }
        res.status(200).json({ "data": company });
    })
});

companyRouter.put("/:id", async (req: Request, res: Response) => {
    var isNumber = /^[0-9]+$/.test(req.params.id);
    if(!isNumber){
        return res.status(400).json({ "message": "Bad Request format" });
    }

    const company: Company = req.body;
    console.log(company)
    const companyId: number = Number(req.params.id);
    companyModel.update(company,companyId, (err: Error) => {
        if (err) {
            
            if (err.message == 'Not Found') {
                return res.status(404).json({ "message": err.message });
            }
        }

        res.status(204).send();
    })
});

companyRouter.delete("/:id", async (req: Request, res: Response) => {
    
    var isNumber = /^[0-9]+$/.test(req.params.id);
    if(!isNumber){
        return res.status(400).json({ "message": "Bad Request format" });
    }
    const companyId: number = Number(req.params.id);
    companyModel.deleteOne(companyId, (err: Error) => {
        if (err) {
            if (err.message == 'Not Found') {
                res.status(404).json({ "message": err.message });
            }
        } else {
            res.status(204).send();
        }
    })
})

companyRouter.delete("/", async (req: Request, res: Response) => {
    
    return res.status(405).json({message:"Method not allowed"})
})

companyRouter.put("/", async (req: Request, res: Response) => {
    
    return res.status(405).json({message:"Method not allowed"})
})

companyRouter.post("/:id", async (req: Request, res: Response) => {
    
    return res.status(405).json({message:"Method not allowed"})
})

export { companyRouter };