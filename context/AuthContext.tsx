import React, { createContext, ReactNode, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'parent' | 'teacher';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: User['role']) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      name: 'Test User',
      role: 'student'
    });
    setIsLoading(false);
  };

  const signUp = async (email: string, password: string, name: string, role: User['role']) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      email,
      name,
      role
    });
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}