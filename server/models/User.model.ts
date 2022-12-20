export interface User {
    _id?: string
    username: string
    email: string
    password: string
    fullname?: string
    isVerified?: boolean
    isAdmin?: boolean
}

export interface Admin extends User {
    isAdmin?: boolean
}

