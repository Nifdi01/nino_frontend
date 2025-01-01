// LoginPage.js (Final Version)
import React, { useState } from 'react';
import { registerUser } from '../services/auth'; // Login function from auth.js
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [first_name, setFirstName] = useState(''); 
  const [last_name, setLastName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [company_name, setCompanyName] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous errors
    
    try {
      await registerUser({ first_name, last_name, email, password, company_name });
      navigate('/'); // Redirect to the overview page after login
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
        <h1 className='text-2xl mb-4'>Register</h1>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleRegister}>
        <div className='w-full mb-4 grid md:grid-cols-2 sm:grid-cols-1 gap-8'>
            <div className='w-full'>
              <label htmlFor='first_name' className='block mb-2'>First Name</label>
              <input
                type='text'
                id='first_name'
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className='w-full p-2 bg-gray-700 rounded'
                required
                autoFocus
              />
            </div>
            <div className='w-full'>
              <label htmlFor='last_name' className='block mb-2'>Last Name</label>
              <input
                type='text'
                id='last_name'
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className='w-full p-2 bg-gray-700 rounded'
                required
                autoFocus
              />
            </div>
          </div>
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
            <label htmlFor='company_name' className='block mb-2'>Company</label>
            <input
              type='text'
              id='company_name'
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
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
