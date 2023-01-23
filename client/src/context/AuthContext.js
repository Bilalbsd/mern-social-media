import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setIsAuthenticated(false)
            }
            
            try {
                const decoded = jwtDecode(token)
                setUserId(true)
                setUserId(decoded.id)
                setUserEmail(decoded.email)
            } catch (err) {
                setIsAuthenticated(false)
            }
        }
        checkToken()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, userEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;