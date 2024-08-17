// AuthContext.tsx

import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: { token: string; value: boolean };
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState({ token: '', value: true });

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated({ token: token, value: true });
    }
  }, []);

  const login = (token: string) => {
    Cookies.set('authToken', token, { expires: 1 }); // expires in 1 day
    setIsAuthenticated({ token: token, value: true });
  };

  const logout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated({ token: '', value: false });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
