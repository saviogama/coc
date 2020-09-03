import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../utils/useAuth';

const DocRoute = ({ component: Component, ...props }) => {
    const { signed, type, loading } = useAuth();

    if (loading) {
        return
    }

    return (
        <Route
            {...props}
            render={() => (signed && type === 1)
                ? <Component {...props} />
                : <Redirect to='/' />
            }
        />
    )
}

export default DocRoute;