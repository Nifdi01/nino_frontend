import { Routes, Route } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import SourcesPage from './pages/SourcesPage';
import KeywordsPage from './pages/KeywordsPage';
import NewsPage from './pages/NewsPage';
import Sidebar from './components/common/Sidebar';
import LoginPage from './pages/LoginPage'; // Assuming you have a login page
import ProtectedRoute from './services/ProtectedRoute'; // Create this component as described earlier
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* Background */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        {/* <div className='absolute inset-0 backdrop-blur-sm' /> */}
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <OverviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/sources'
          element={
            <ProtectedRoute>
              <SourcesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/keywords'
          element={
            <ProtectedRoute>
              <KeywordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/news'
          element={
            <ProtectedRoute>
              <NewsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings'
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
