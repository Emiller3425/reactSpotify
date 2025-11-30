import { useState, useEffect } from "react";

import LogoutButton from "./logoutbutton.jsx";

function UserProfileCard({loggedIn}) {
    const authStatus = loggedIn;
    if (authStatus) {
        return(
            <div className="position absolute flex flex-col bg-slate-900">
                <LogoutButton displayText={"Logout"}/>
            </div>
        );
    } else {

    }
}

export default UserProfileCard;