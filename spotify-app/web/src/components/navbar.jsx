import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';


function Navbar({ size }) {
    console.log(size);
    return (
        <Router basename="\">
            <div className="flex flex-col bg-slate-900 px-8 py-8 text-white">
                <div className="flex items-center justify-between">
                    {/* Left Aligned */}
                    <div className="flex items-center">
                        <h1 className="mr-4 text-xl">Spoootify</h1>
                    </div>
                    {/* Right Aligned */}
                </div>
            </div>
        </Router>
    );
}
export default Navbar;