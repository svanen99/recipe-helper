'use client'
import { createContext, useContext, useState } from 'react';
import { UserContextType, UserType } from './types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);

    const updateUser = (updatedUser: UserType) => {
        setUser(updatedUser);
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};