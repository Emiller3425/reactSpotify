import React, { useState } from 'react';

function Button({displayText}) {

    return (
        <button className="bg-emerald-500 rounded py-2 px-4">
            {displayText}
        </button>
    );
}

export default Button;