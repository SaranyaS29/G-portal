import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";


const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleComplaintClick = () => {
    if (auth && auth.token) {
      navigate('/complaint');
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">SmartGov Portal</h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer" onClick={handleComplaintClick}>
            Raise a Complaint
          </li>
          
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/signin')}>
            Sign In
          </li>
        </ul>
      </nav>

      {/* Slideshow Banner */}
      <div className="relative w-full h-64 overflow-hidden">
        <div className="w-full h-full bg-cover bg-center animate-slide bg-[url('/images/slide1.jpg')]"></div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Voice Matters!</h2>
        <p className="text-gray-600 mb-6">
          Register your complaints related to sanitation, roads, water, electricity and more.
        </p>
        <button
          onClick={handleComplaintClick}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
        >
          Raise a Complaint Now
        </button>
      </section>
    </div>
  );
};

export default Home;
