import React from 'react';

import spotify from '../images/spotify.png'

import Button from './button.jsx';

function Header() {
    return (
        <div class="flex flex-col bg-slate-900 px-8 py-8 text-white">
            <div class="flex items-center justify-between">
                {/* Left Aligned */}
                <div class="flex items-center">
                    <h1 class="mr-4 text-xl">Spoootify</h1>
                    <img src={spotify} class="h-8 w-8"></img>
                </div>
                {/* Right Aligned */}
            <Button displayText="Login"/>
            </div>
        </div>
    );
}

export default Header;