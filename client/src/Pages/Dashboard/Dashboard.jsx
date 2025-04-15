import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
  const [closedComplaints, setClosedComplaints] = useState(0);

  useEffect(() => {
    // Check if the user is authenticated and if userId exists in localStorage
    const userId = localStorage.getItem('userId');
    
    // If there's no userId in localStorage, navigate to sign-in page
    // if (!userId) {
    //   navigate('/signin');
    //   return;
    // }

    const fetchComplaints = async () => {
      try {
        console.log('id',auth.user.id);
        const response = await axios.get(
          `http://localhost:5000/api/complaints/${userId}`
        );
        setComplaints(response.data.complaints);
        setTotalComplaints(response.data.totalComplaints);
        setPendingComplaints(response.data.pendingComplaints);
        setClosedComplaints(response.data.closedComplaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, [navigate]); // No need to depend on auth.user here anymore

  // If auth is still loading, show a loading indicator
  if (!auth.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Welcome, {auth.user.name}</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Complaints</h3>
          <p className="text-2xl font-bold text-blue-600">{totalComplaints}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl font-bold text-yellow-500">{pendingComplaints}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Closed</h3>
          <p className="text-2xl font-bold text-green-600">{closedComplaints}</p>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Reg No</th>
              <th className="px-4 py-2">Received Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={complaint._id} className="text-center border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{complaint.regNo}</td>
                <td className="px-4 py-2">
                  {new Date(complaint.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{complaint.description}</td>
                <td className="px-4 py-2 font-medium">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      complaint.status === 'Pending'
                        ? 'bg-yellow-500'
                        : complaint.status === 'Closed'
                        ? 'bg-green-600'
                        : 'bg-gray-500'
                    }`}
                  >
                    {complaint.status}
                  </span>
                </td>
              </tr>
            ))}
            {complaints.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
