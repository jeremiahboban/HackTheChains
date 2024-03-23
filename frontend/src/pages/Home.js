import React from "react";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Using Blockchain for Transparency</h1>
          <p className="text-lg mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed libero sit amet felis aliquam convallis.
          </p>
          <button onClick={() => navigate("/donate")}
          className="bg-white text-blue-500 py-2 px-6 rounded-full font-semibold hover:bg-blue-700 hover:text-white transition duration-300">
            Donate Now
          </button>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed libero sit amet felis aliquam convallis. Cras nec odio semper, tincidunt metus eget, ultricies ligula.
          </p>
          <p className="text-lg">
            Nullam sed libero sit amet felis aliquam convallis. Cras nec odio semper, tincidunt metus eget, ultricies ligula.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Recent Projects</h2>
          {/* Display recent projects here */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-8 text-center">
        <p>&copy; 2024 CharityName. All rights reserved.</p>
      </footer>
    </div>
  );
        </>
    );
}
