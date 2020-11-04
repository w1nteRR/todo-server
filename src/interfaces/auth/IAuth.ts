export interface ISignInUser {
    email: string
    password: string
}

export interface ISignUpUser {
    email: string
    password: string
    confirmPassword?: string
}