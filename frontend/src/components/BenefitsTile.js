import React from "react";
import { Tilt } from "react-tilt";

const TiltCard = ({ imageUrl, title, text }) => {
    return (
        <div className="">
            <Tilt className="Tilt" options={{ max: 25 }}>
                <div className="Tilt-inner bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
                    <div className="w-24 h-24 mx-auto mb-4">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h5 className="text-lg font-semibold mb-2">{title}</h5>
                    <p className="text-gray-600">{text}</p>
                </div>
            </Tilt>
        </div>
    );
};

export default TiltCard;
