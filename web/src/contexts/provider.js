import React from 'react';
import { useHistory } from 'react-router-dom';
import Context from './context';
import useStorage from '../utils/useStorage';

const StoreProvider = ({ children }) => {
    const [token, setToken] = useStorage('token');
    const [type, setType] = useStorage('type');

    const history = useHistory();

    function signOut(){
        localStorage.clear();
        history.push("/");
    }

    return (
        <Context.Provider
            value={{
                token,
                setToken,
                type,
                setType,
                signOut
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default StoreProvider;