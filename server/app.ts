import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {companyRouter} from "./routes/companyRouter";
import {gameRouter} from "./routes/gameRouter";
import { reviewRouter } from "./routes/reviewRouter";
import  {userRouter} from "./routes/userRouter"

const app = express();
dotenv.config();
let cors = require("cors");


app.use(cors());
app.use(bodyParser.json())

app.use((err:any, req:any, res:any, next:any) => {
    if (err) {
      res.status(400).json({error:"Bad Request. Check JSON format"})
    } else {
      next()
    }
  })
companyRouter.use('/:companyId/games',gameRouter)
gameRouter.use('/:gameId/reviews',reviewRouter);
app.use("/companies", companyRouter);

app.use('/users',userRouter)


app.use(function(req, res, next) {
  res.status(404);
  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }
});

app.get('*', function(req, res){
    res.status(404).json({message: "Page was not found"});
  });

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});