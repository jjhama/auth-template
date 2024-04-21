// "use client";
import LoginForm from "@/components/LoginForm";
import { getSession } from "@/utils/actions";
import { redirect } from "next/navigation";

const Login = async () => {

    const session = await getSession();

    console.log(session);

    if(session.isLoggedIn === true){
        redirect("/")
    }

    return (
        <div className="login">
        <h1>Login</h1>
        <LoginForm />
        </div>
    );
}

export default Login;
