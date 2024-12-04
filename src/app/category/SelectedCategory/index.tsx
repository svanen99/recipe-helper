import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  user: any; 
  setUser: React.Dispatch<React.SetStateAction<any>>; 
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Vegansk");

  return (
    <UserContext.Provider value={{ user, setUser, selectedCategory, setSelectedCategory }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};