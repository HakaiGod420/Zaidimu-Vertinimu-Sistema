import { BasicCompany,Company } from "./company";

export interface BasicGame{
    id:number
}
export interface Game extends BasicGame{
    name:string,
    summary:string,
    releaseDate:Date,
    startingPrice:number,
    thumbnail:string
    howManyRated:number
    company:BasicCompany
}
export interface GameWithDetails extends Game{
    company:Company
}