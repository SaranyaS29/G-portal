import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const departments = [
  {
    name: 'Sanitation',
    description: 'Report issues like garbage collection, drainage, and public toilet maintenance.',
    color: 'bg-green-100',
  },
  {
    name: 'Water Supply',
    description: 'Complaints related to water leakage, shortage, and drinking water quality.',
    color: 'bg-blue-100',
  },
  {
    name: 'Electricity',
    description: 'Issues related to street lights, power cuts, and transformer faults.',
    color: 'bg-yellow-100',
  },
  {
    name: 'Roads & Transport',
    description: 'Report potholes, damaged roads, and traffic signal failures.',
    color: 'bg-orange-100',
  },
  {
    name: 'Health & Safety',
    description: 'Raise concerns about mosquito breeding, food safety, and emergency services.',
    color: 'bg-red-100',
  },
];

const Complaint = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Raise Your Complaint</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p className="text-lg mb-4 font-medium text-gray-700">
        Hello, {auth?.user?.name || 'User'}! Select a department to raise your complaint:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer ${dept.color}`}
            onClick={() => navigate(`/complaint/${dept.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`)}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{dept.name}</h3>
            <p className="text-gray-600">{dept.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaint;
