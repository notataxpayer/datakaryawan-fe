import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const STATIC_CREDENTIAL = {
  username: 'admin',
  password: 'admin',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username, password) => {
    if (
      username === STATIC_CREDENTIAL.username &&
      password === STATIC_CREDENTIAL.password
    ) {
      const userData = { username, fullName: 'Admin Default' }; // default fullName
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: 'Username or password is incorrect' };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateFullName = (newFullName) => {
    const updatedUser = { ...user, fullName: newFullName };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateFullName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
