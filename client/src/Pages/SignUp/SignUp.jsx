import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/register', user);
      alert('Registration successful! Please sign in.');
      navigate('/signin');
    } catch (error) {
      alert('Something went wrong. User may already exist.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </span>
        </p>

        <p className="text-sm mt-2 text-center">
          <Link to="/" className="text-gray-600 hover:underline">
            ← Back to Home
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
