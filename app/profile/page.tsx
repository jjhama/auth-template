import { changePremium, getSession, updateUserName } from "@/utils/actions";
import { redirect } from 'next/navigation'

const Profile = async() => {
    const session  = await getSession();

    if(!session.isLoggedIn){
        redirect('/');
    }

    return (
        <div className="profile">
            <h1>Profile</h1>
            <p>this is the Profile page. Only logged in users should be able to see this page.</p>
            <p>Welcome <b>{session.userName}</b></p>
            <span>You are a <b>{session.isPremium ? "Premium" : "Normal"}</b> User.</span>
            
            <form action = {changePremium}>
                <button>{session.isPremium? "Cancel" : "Buy"} Premium</button>
            </form>

            <form action = {updateUserName}>
                <input type="text" name="newUserName" required placeholder={session.userName} />
                <button>Update Username</button>
            </form>
        </div>
    );
}

export default Profile;
