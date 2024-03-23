import React from "react";
import { NavBar } from '../components/NavBar'; 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    useEffect(() => {
        let text = document.getElementById("text");
        let leaf = document.getElementById("leaf");
        let hill1 = document.getElementById("hill1");
        let hill4 = document.getElementById("hill4");
        let hill5 = document.getElementById("hill5");

        window.addEventListener("scroll", () => {
            let value = window.scrollY;

            if (text !== null) {
                // Set a maximum scroll limit (adjust the limit as needed)
                const maxScroll = 400;

                // Apply the scroll transformations only if within the limit
                if (value <= maxScroll) {
                    text.style.marginTop = value * 2.5 + "px";
                    leaf.style.top = value * -1.5 + "px";
                    leaf.style.left = value * 1.5 + "px";
                    hill5.style.left = value * 1.5 + "px";
                    hill4.style.left = value * -1.5 + "px";
                    hill1.style.top = value * 1 + "px";
                }
            }
        });
    }, []);
    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-4xl font-bold"
                >
                    <NavBar />
                    <div className="text-blue">
                        <h1>ChainityCharity</h1>
                        <p>This text will be blue.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
