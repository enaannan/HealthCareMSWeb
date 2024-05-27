import React, { createContext, useEffect, useState, ReactNode } from "react";
import { LoginCredentials, User } from "../interfaces/User";
import { AuthService } from "../services/authservice";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = async (logincredentials: LoginCredentials) => {
    const user = await AuthService.login(logincredentials);
    if (user) {
      setUser(user);
    }
  };

  const register = async (user: User) => {
    const newUser = await AuthService.register(user);
    if (newUser) {
      setUser(newUser);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
