import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });

      // Save auth to context and localStorage
      login({
        token: res.data.token,
        user: res.data.user,
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.log('error',error);
      alert('Invalid credentials or user not found!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
  type="password"
  placeholder="Password"
  className="w-full mb-4 px-4 py-2 border rounded"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  autoComplete="current-password"  // Added this line
/>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
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

export default Login;
