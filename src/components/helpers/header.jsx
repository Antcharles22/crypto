import React from "react";
import { Link } from "react-router-dom";

export default function Header({ back }) {
    return (
        <header className="header">
            <div className="width">
                {back && (
                <Link to='/'>  
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="50px" fill="#e3e3e3">
                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                </svg>
                </Link>
                )}
                <h1><Link to="/">ConinCase</Link></h1>
            </div>
        </header>
    );
}