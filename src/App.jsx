import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import EditProfilePage from './pages/EditProfilePage';
import EmployeePage from './pages/EmployeePage';


export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <>
    <div className="">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
      
    </>
  );
}
