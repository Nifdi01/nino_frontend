import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import OverviewPage from './pages/OverviewPage'
import SourcesPage from './pages/SourcesPage'
import KeywordsPage from './pages/KeywordsPage'
import Sidebar from './components/common/Sidebar'

function App() {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>

    {/* BG */}
    <div className='fixed inset-0 z-0'>
      <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
      <div className='absolue inset-0 backdrop-blur-sm'/>
    </div> 

      <Sidebar />
      <Routes>
        <Route path='/' element={<OverviewPage />} />
        <Route path='/sources' element={<SourcesPage />} />
        <Route path='/keywords' element={<KeywordsPage />} />
      </Routes>
    </div>
  )
}

export default App
