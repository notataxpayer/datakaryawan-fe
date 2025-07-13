import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwticher';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/dashboard">My App</Link>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        {user && (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span>{user.fullName || user.username}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-10">
              <Link
                to="/dashboard"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                to="/edit-profile"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Edit Profile
              </Link>
              <Link
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
