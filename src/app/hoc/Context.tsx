'use client';
import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext<any>('');

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let [auth, setAuth] = useState('');
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
