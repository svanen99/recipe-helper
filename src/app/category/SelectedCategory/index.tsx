import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Hanterar inloggad användare
  const [selectedCategory, setSelectedCategory] = useState("Vegansk");  // Standardkategori

  return (
    <UserContext.Provider value={{ user, setUser, selectedCategory, setSelectedCategory }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
