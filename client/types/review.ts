import { BasicGame, Game } from "./game";
import { BasicUser, User } from "./user";

export interface BasicReview{
    id: number
}

export interface Review extends BasicReview{
    comment: string,
    rating: number,
    user: BasicUser,
    game: BasicGame
    postDate: Date
}

export interface ReviewWithDetails extends Review{
    user:User,
    game:Game
}