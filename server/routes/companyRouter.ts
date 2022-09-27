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
});


companyRouter.post("/", async (req: Request, res: Response) => {
    const newCompany: BasicCompany = req.body;
    companyModel.create(newCompany, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).json({ "id": id });
    });
});

companyRouter.get("/:id", async (req: Request, res: Response) => {
    const companyId: number = Number(req.params.id);
    companyModel.findOne(companyId, (err: Error, company: Company) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": company });
    })
});

companyRouter.put("/:id", async (req: Request, res: Response) => {
    const company: Company = req.body;
    companyModel.update(company, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }

        res.status(200).send();
    })
});

companyRouter.delete("/:id", async (req: Request, res: Response) => {
    const companyId: number = Number(req.params.id);
    companyModel.deleteOne(companyId, (err: Error) => {
      if (err) {
        return res.status(404).json({"message": err.message});
      }
      res.status(204).send();
    })
  });

export { companyRouter };