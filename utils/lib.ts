import { SessionOptions } from "iron-session"

export interface SessionData {
    userId?:string,
    userName?:string,
    img?:string,
    isPremium?:boolean,
    isLoggedIn:boolean
}

export const defaultSession: SessionData = {
    isLoggedIn:false
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: process.env.COOKIE_NAME!,
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
}

