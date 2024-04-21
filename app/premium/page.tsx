import { getSession } from "@/utils/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const Premium = async () => {

    const session = await getSession();

    if(!session.isLoggedIn){
        redirect("/")
    }

    if(!session.isPremium){
        return (
            <div>
                <h1>Only Premium users can access this content</h1>
                <Link href="/profile">Go to profile to buy Premium</Link>
            </div>
        )
    }

    return (
        <div className="premium">
            <h1>Premium</h1>
            <p>this is the Premium page. Only premium users should be able to access this page.</p>
            <ul>
                <li>Apple</li>
                <li>Orange</li>
                <li>Peach</li>
            </ul>
        </div>
    );
}

export default Premium;
