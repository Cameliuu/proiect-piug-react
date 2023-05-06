import React,{ useState } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const login = (username) => {
        setUsername(username);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUsername('');
        setIsLoggedIn(false);
    };

    const value = {
        isLoggedIn,
        username,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
