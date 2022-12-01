export interface BasicUser{
    user_id: number,
    username: string,
}

export interface User extends BasicUser{
    password: string,
    email: string,
    isAdmin: boolean,
    token: string
}