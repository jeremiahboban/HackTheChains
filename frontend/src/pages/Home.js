import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import TiltCard from "../components/BenefitsTile.js";
import ToTopButton from "../components/ToTopButtom.js";
import ParticleCanvas from "../components/ParticleCanvas.js";
import Typewriter from "typewriter-effect";
import "../App.css";

export default function Home() {
    const navigate = useNavigate();

    const tiltCardData = [
        {
            imageUrl:
                "https://charity-chain.com/wp-content/uploads/2022/01/Trust.svg",
            title: "Trust",
            text: `Blockchain technology is decentralized and records can't be changed or deleted. This will enhance a Charity's credibility and increase its donor's trust.\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`,
        },
        {
            imageUrl:
                "https://charity-chain.com/wp-content/uploads/2022/01/Traceable.svg",
            title: "Traceable",
            text: "Transactions leave a trail; everything can be tracked. Blockchain technology makes it much harder to misappropriate or misuse funds.\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
        },
        {
            imageUrl:
                "https://charity-chain.com/wp-content/uploads/2022/01/Auditable.svg",
            title: "Transparent",
            text: "Transactions cannot be deleted, giving auditors confidence that information is correct. Smart contracts allow decisions to be traced by the governing board.",
        },
        {
            imageUrl:
                "https://charity-chain.com/wp-content/uploads/2022/01/Tailored.svg",
            title: "Tailored",
            text: "Charities can tailor their own blockchain to suit their needs. They can choose the level of privacy and security they require.",
        },
        {
            imageUrl:
                "https://charity-chain.com/wp-content/uploads/2022/01/Costumer.svg",
            title: "Know Your Charity",
            text: "Donors can see exactly where their money is going and how it is being used. This will increase the trust between the charity and the donor.",
        },
        {
            imageUrl:
                "https://charity-chain.com/wp-content/uploads/2022/03/Better_data.svg",
            title: "Better Data",
            text: `Campaign and donor data collected live as donations are made with widgets for charity websites wallet apps.`,
        },

        // Add data for other tilt cards here
    ];

    return (
        <div className="app z-10">
            <NavBar />
            {/* Particles Animation */}
            <div className="flex justify-center items-center h-screen">
                <h1>
                    <div className="flex items-center text-5xl font-bold text-black">
                        <Typewriter
                            options={{
                                strings: [
                                    "Transforming Charity with Blockchain",
                                    "Transparent Donations",
                                    "Charity Accountability",
                                ],
                                autoStart: true,
                                loop: true,
                                cursor: ".",
                            }}
                        />
                    </div>
                </h1>
            </div>
            <ParticleCanvas />

            <div className="bg-blue-500 min-h-screen app-header">
                <ToTopButton />

                {/* Hero Section */}
                <div className="bg-blue-500 text-white py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            Using Blockchain for Transparency
                        </h1>
                        <p className="text-lg mb-8">
                            Support our cause by donating with cryptocurrency on
                            the Solana blockchain. Ensure transparency with
                            every donation.
                        </p>
                        <button
                            onClick={() => navigate("/donate")}
                            className="bg-white text-blue-500 py-2 px-6 rounded-full font-semibold hover:bg-blue-700 hover:text-white transition duration-300"
                        >
                            Donate Now
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 overflow-hidden">
                        <img
                            src="waterhands.jpg"
                            alt="Charity Image"
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Mission Section */}
                    <div className="bg-white w-full lg:w-1/2 py-10">
                        <div className="max-w-4xl mx-10">
                            <h2 className="text-3xl font-bold mb-6 text-blue-500">
                                Our Mission
                            </h2>

                            <p className="text-lg mb-6">
                                At Charity Clarity, we're driven by a singular
                                mission: to revolutionize charity and
                                philanthropy through transparency and
                                accountability.
                            </p>
                            <p className="text-lg mb-6">
                                The final destination of every donation should
                                be as clear as the path it took to get there.
                                That's why we're leveraging blockchain
                                technology to create a new standard of
                                transparency in charitable giving.
                            </p>
                            <p className="text-lg">
                                Charity fraud is an unfortunate reality that
                                undermines the generosity of well-intentioned
                                donors and hampers the effectiveness of
                                charitable organizations. Every donation made
                                through our platform is securely recorded on the
                                immutable Solana blockchain, providing donors
                                with unprecedented transparency into how their
                                contributions are being utilized.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-500 text-white pt-10 pb-10 px-4">
                    <div className="max-w-4xl mx-auto text-left">
                        <h2 className="text-2xl font-bold mb-4">
                            Benefits for Charities
                        </h2>
                        <div className="bg-white h-1"></div>
                    </div>
                </div>

                {/* Tilt cards for Benefits */}
                <div className="px-20">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {tiltCardData.map((card, index) => (
                            <TiltCard
                                key={index}
                                imageUrl={card.imageUrl}
                                title={card.title}
                                text={card.text}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-blue-500 text-white py-8 text-center">
                    <p>&copy; 2024 Chainity Charity. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
