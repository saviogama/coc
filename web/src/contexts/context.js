import { createContext } from 'react';

const StoreContext = createContext({
    token: null,
    setToken: () => { },

    type: null,
    setType: () => { },
});

export default StoreContext;