import React, { useState } from 'react';
import { loginUser } from '../components/services/auth'; // Import the login function
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      await loginUser({ email, password, company }); // Login request
      navigate('/'); // Redirect after successful login
    } catch (err) {
      // Handle error responses
      if (err.detail) {
        setError(err.detail); // Detailed error from the server
      } else if (typeof err === 'string') {
        setError(err); // String error
      } else if (err.message) {
        setError(err.message); // JavaScript Error object message
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='w-full flex justify-center items-center h-screen text-gray-100 z-10'>
      <div className='md:w-1/3 p-6 bg-gray-800 rounded shadow-md'>
        <h1 className='text-2xl mb-4'>Login</h1>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleLogin}>
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
            Login
          </button>
          <div className='my-4'>
            <a href="/register" className="inline-flex items-center justify-center text-blue-600 dark:text-blue-500 hover:underline">
              Click here to register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
