export interface BasicUser{
    id: number
}

export interface User extends BasicUser{
    nickname: string,
    firstTimeLogin: boolean
}