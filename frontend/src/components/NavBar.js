import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <>
            <header className="bg-blue-500 p-4">
                <nav className="flex justify-left space-x-4">
                    <Link
                        to="/"
                        className={`text-white px-4 py-2 rounded-lg font-bold text-xl `}
                    >
                        Chainity Charity
                    </Link>
            
                    <Link
                        to="/donate"
                        className={`text-white ${
                            props.active === "advisor"
                                ? "bg-white text-blue-500"
                                : ""
                        } px-4 py-2 rounded-full font-bold text-xl hover:bg-white hover:text-blue-500`}
                    >
                        Donate
                    </Link>
                    <Link
                        to="/contributions"
                        className={`text-white ${
                            props.active === "portfolio"
                                ? "bg-white text-blue-500"
                                : ""
                        } px-4 py-2 rounded-full font-bold text-xl hover:bg-white hover:text-blue-500`}
                    >
                        Contributions
                    </Link>
            
                </nav>
            </header>
        </>
    );
}
