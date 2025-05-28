import React from 'react';

import spotify from '../images/spotify.png'

// components
import LoginButton from './loginbutton.jsx';

function Header({loggedIn}) {
    const authStatus = loggedIn;
    return (
        <div className="flex flex-col bg-slate-900 px-8 py-8 text-white">
            <div className="flex items-center justify-between">
                {/* Left Aligned */}
                <div className="flex items-center">
                    <h1 className="mr-4 text-xl">Spoootify</h1>
                    <img src={spotify} alt="Spoootify Logo" className="h-8 w-8"></img>
                </div>
                {/* Right Aligned */}
            <UserGreeting status={authStatus}/>
            </div>
        </div>
    );
}

function UserGreeting({status}) {
    if (status) {
        return <p>hello!</p>;
    } else {
        return <LoginButton displayText="Log In"/>;
    }
}


export default Header;