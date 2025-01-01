import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/auth';

const Header = ({ title }) => {
  const fullName = localStorage.getItem('userFullName');
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
      <div className='container flex justify-between items-center mx-auto px-4 py-4'>
        <h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
        <div className='flex items-center space-x-4'>
          <p>
          Logged in as <span className='font-semibold'>{fullName}</span>
          </p>
          <button 
            onClick={handleLogout} 
            className='flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded transition'>
            <LogOut className='mr-2' />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
