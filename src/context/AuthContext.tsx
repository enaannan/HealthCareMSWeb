import React, { createContext, useEffect, useState, ReactNode } from "react";
import { LoginCredentials, User } from "../interfaces/User";
import { AuthService } from "../services/authservice";
import { useNavigate } from 'react-router-dom';
import { Roles } from "../types/roles";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isOfficer: boolean;
  isPatient: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
  isOfficer: false,
  isPatient: false,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (loginCredentials: LoginCredentials) => {
    const user = await AuthService.login(loginCredentials);
    if (user) {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role_name === Roles.OFFICER) {
        navigate('/officer/dashboard');
      } else if (user.role_name === Roles.PATIENT) {
        navigate('/patient/dashboard');
      } else {
        navigate('/unauthorized');
      }
    }
  };

  const register = async (user: User) => {
    const newUser = await AuthService.register(user);
    if (newUser) {
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAuthenticated = !!user;
  const isOfficer = user?.role_name === 'officer';
  const isPatient = user?.role_name === 'patient';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isOfficer, isPatient }}>
      {children}
    </AuthContext.Provider>
  );
};
