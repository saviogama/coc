import React, { createContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../utils/useLocalStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp:user');
    const [storageType, setStorageType, removeStorageType] = useLocalStorage('@authApp:type');
    const [user, setUser] = useState(null);
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (storageUser && storageType) {
            setUser(storageUser);
            setType(storageType);
        }
        setLoading(false);
    }, []);

    function setToken(token, bool) {
        setLoading(true);
        setUser(token);
        setStorageUser(token);
        setType(bool);
        setStorageType(bool);
        setLoading(false);
    }

    const signOut = useCallback(() => {
        setLoading(true);
        removeStorageUser();
        removeStorageType();
        setUser(null);
        setType(null);
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            signed: user ? true : false,
            user,
            type,
            setToken,
            signOut,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;