import { db } from "../db";
import { Review,BasicReview,ReviewWithDetails } from "../types/review";
import { OkPacket, RowDataPacket } from "mysql2";



export const findAll = (gameID: number, callback: Function) => {
    const queryString = "SELECT * FROM `review` WHERE GameId=?"
    db.query(queryString, gameID, (err, result) => {
      if (err) { callback(err) }
  
      const rows = <RowDataPacket[]>result;
      const reviews: Review[] = [];
      rows.forEach(row => {
        const game: Review = {
          id: row.id,
          comment: row.Comment,
          rating: row.Rating,
          postDate: row.PostDate,
          game:{
            id:row.GameId
          },
          user:{
            id:row.UserId
          }
        }
        reviews.push(game);
      });
      callback(null, reviews);
    });
  }