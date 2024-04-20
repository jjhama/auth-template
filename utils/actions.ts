"use server";
import { getIronSession } from "iron-session"
import { sessionOptions, SessionData, defaultSession } from "./lib"
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";


let userName = "John";
let isPro = true;

export const getSession = async() => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if(!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    } 

    return session;

}

export const login = async (
        prevState : {error: undefined | string},
        formData:FormData
    ) => {
    console.log("Login attempted.")

    const session = await getSession();

    const formUsername = formData.get("username") as string
    const formPassword = formData.get("password") as string
    console.log("username:" + formUsername + ", password:" + formPassword);
    //const user = await db.getUser()
    console.log("username:" + formUsername + ", userName:" + userName);

    if(formUsername !== userName ) {
        console.log("credentials invalid")
        return{error:"Wrong Credentials!"}
    }

    console.log("session verfied")
    session.userId = "1";
    session.userName = formUsername;
    session.isPremium = isPro;
    session.isLoggedIn = true;

    await session.save();
    redirect('/profile');
}


export const logout = async() => {
    console.log("Logout attempted.")
    const session = await getSession()
    session.destroy();
    redirect('/'); 
}

export const changePremium = async() => {
    const session = await getSession();

    isPro = !session.isPremium
    session.isPremium = isPro;
    session.save();
    revalidatePath("/profile")
}

export const updateUserName = async(formData:FormData) => {
    const session = await getSession();

    var newUserName = formData.get("newUserName") as string
    userName = newUserName;
    session.userName = newUserName;
    session.save();
    revalidatePath("/profile")
}

