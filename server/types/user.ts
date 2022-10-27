export interface BasicUser{
    id: number
}

export interface User extends BasicUser{
    nickname: string,
    password: string,
    email: string,
    role: string,
    token: string
}