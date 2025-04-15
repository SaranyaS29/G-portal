import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react'; // Ensure lucide-react is installed

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded bg-white shadow-md hover:bg-gray-100"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-8">SmartGov</h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/complaint" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
                Register a Complaint
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-left w-full hover:text-red-600">
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
