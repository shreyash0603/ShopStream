"use client";

import type { User } from '@/types';
import { mockUsers } from '@/lib/users';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'shopstream_auth_token';
const USER_INFO_KEY = 'shopstream_user_info';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_INFO_KEY);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load auth state from localStorage", error);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const mockToken = `mock-jwt-token-${Date.now()}`;
      const { password: _removedPassword, ...userToStore } = foundUser; // don't store password

      setToken(mockToken);
      setUser(userToStore);
      try {
        localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(userToStore));
      } catch (error) {
        console.error("Failed to save auth state to localStorage", error);
      }
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_INFO_KEY);
    } catch (error) {
      console.error("Failed to remove auth state from localStorage", error);
    }
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
