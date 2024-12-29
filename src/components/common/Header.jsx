import React from 'react'

const Header = ({title}) => {
  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
        <div className='container mx-auto px-4 py-4'>
            <h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
        </div>
    </header>
  )
}

export default Header