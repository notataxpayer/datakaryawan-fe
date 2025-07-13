import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://datakaryawan-be-production.up.railway.app/api/login', {
        username,
        password,
      });

      const accessToken = response.data.data.token;
      const userData = response.data.data.admin;

      setToken(accessToken);
      setUser(userData);

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'https://datakaryawan-be-production.up.railway.app/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (_) {}

    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateFullName = (newName) => {
    const updatedUser = { ...user, name: newName };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated, updateFullName }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
