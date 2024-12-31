// LoginPage.js (Final Version)
import React, { useState } from 'react';
import { registerUser } from '../components/services/auth'; // Login function from auth.js
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous errors
    try {
      await registerUser({ email, password, company });
      navigate('/'); // Redirect to the overview page after login
    } catch (err) {
      // Handle different error structures
      if (err.detail) {
        setError(err.detail);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className='w-full flex justify-center items-center h-screen text-gray-100 z-10'>
      <div className='md:w-1/3 p-6 bg-gray-800 rounded shadow-md'>
        <h1 className='text-2xl mb-4'>Register</h1>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleRegister}>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-2'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 bg-gray-700 rounded'
              required
              autoFocus
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block mb-2'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 bg-gray-700 rounded'
              required
            />
          </div>
          {/* Remove 'company' field if not needed */}
          <div className='mb-4'>
            <label htmlFor='company' className='block mb-2'>Company</label>
            <input
              type='text'
              id='company'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className='w-full p-2 bg-gray-700 rounded'
              required
            />
          </div>
          <button type='submit' className='w-full bg-blue-600 p-2 rounded'>
            Register
          </button>
          <div className='my-4'>
            <a href="/login" className="inline-flex items-center justify-center text-blue-600 dark:text-blue-500 hover:underline">
            Click here to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
