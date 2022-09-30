import { Game, BasicGame, GameWithDetails } from "../types/game";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (game: BasicGame, callback: Function) => {
  const queryString = "INSERT INTO `game`(`Name`, `Summary`, `ReleaseDate`, `CompanyID`, `StartingPrice`, `Thumbnail`) VALUES (?,?,?,?,?,?)"

  if(game.company.id == undefined){
    const err2 = new Error('No Company ID was selected')
    callback(err2,-1)
    return;
  }
  db.query(
    queryString,
    [game.name, game.summary, game.releaseDate, game.company.id, game.startingPrice, game.thumbnail],
    (err, result) => {
      if (err) { callback(err);return };

      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

export const findOne = (gameID: number,companyId:number, callback: Function) => {

  const queryString = "SELECT g.*, c.*,g.Name as 'GameName',g.id as 'GameID' FROM game as g INNER JOIN company as c on c.id=g.CompanyID where g.id=? and c.id=?"

  db.query(queryString, [gameID,companyId], (err, result) => {
    if (err) { callback(err) }

    const row = (<RowDataPacket>result)[0];

    if (row == undefined) {
      const err2 = new Error('Where is no game with selected ID')
      callback(err2)
      return;
    }

    const game: GameWithDetails = {
      id: row.GameID,
      name: row.GameName,
      summary: row.Summary,
      releaseDate: row.ReleaseDate,
      startingPrice: row.StartingPrice,
      thumbnail: row.Thumbnail,
      howManyRated:row.howManyRated,
      company: {
        id: row.id,
        name: row.Name,
        creationDate: row.CreationDate,
        image: row.Image
      }
    }
    callback(null, game);
  });
}


export const findAll = (companyID: number, callback: Function) => {
  const queryString = "SELECT g.*, c.*,g.Name as 'GameName',g.id as 'GameID' FROM game as g INNER JOIN company as c on c.id=g.CompanyID where c.id=?"
  db.query(queryString, companyID, (err, result) => {
    if (err) { callback(err) }

    const rows = <RowDataPacket[]>result;
    const games: Game[] = [];
    rows.forEach(row => {
      const game: Game = {
        id: row.GameID,
        name: row.GameName,
        summary: row.Summary,
        releaseDate: row.ReleaseDate,
        startingPrice: row.StartingPrice,
        thumbnail: row.Thumbnail,
        howManyRated:row.HowManyRated,
        company: {
          id: row.id,
        }
      }
      games.push(game);
    });
    callback(null, games);
  });
}


export const update = (game: Game, callback: Function) => {
  const queryString = "UPDATE `game` SET `Name`=?,`Summary`=?,`ReleaseDate`=?,`CompanyID`=?,`StartingPrice`=?,`Thumbnail`=? WHERE id=?";

  db.query(
      queryString,
      [game.name,game.summary,game.releaseDate,game.company.id,game.startingPrice,game.thumbnail,game.id],
      (err, result) => {
          if (err) { callback(err) }
          callback(null);
      }
  );
}

export const deleteOne = (gameId: number, callback: Function) => {

  const queryString = "DELETE FROM `game` WHERE id=?"

  db.query(queryString, gameId, (err, result) => {
      if (err) { callback(err) }
      callback(null)
  });
}