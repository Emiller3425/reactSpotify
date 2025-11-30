import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

function LogoutButton({displayText}) {
    const [cookies, setCookie, removeCookie] = useCookies(["authentication_token"]);
    

    const handleLogout = () => {
        if (cookies?.authentication_token) {
            removeCookie("authentication_token", {
                path:'/'
            });
            window.location.reload(true);
        } else {
            console.log("Cookie Deletion Did Not Work")   
        }
    }

    return (
        <div className="border-box bg-gray-500 align-items center">
        <button className="bg-emerald-500 rounded py-2 px-4" onClick={handleLogout}>
            {displayText}
        </button>
        </div>
    );
}

export default LogoutButton;