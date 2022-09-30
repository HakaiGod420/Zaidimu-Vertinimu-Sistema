import { BasicCompany,Company } from "./company";

export interface BasicGame{
    name:string,
    summary:string,
    releaseDate:Date,
    startingPrice:number,
    thumbnail:string
    howManyRated:number
    company:BasicCompany
}
export interface Game extends BasicGame{
    id:number
}
export interface GameWithDetails extends Game{
    company:Company
}