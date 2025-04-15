import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterComplaint = () => {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/complaints/create',
        { description },
        { headers: { userId: auth.user._id } }
      );
      navigate('/dashboard');
    } catch (err) {
      alert('Error submitting complaint');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Register Complaint</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-3 mb-4"
          placeholder="Describe your complaint..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterComplaint;
