import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import StoreContext from '../contexts/context';

export const MedRoute = ({ component: Component, ...rest }) => {
    const { token, type } = useContext(StoreContext);

    return (
        <Route
            {...rest}
            render={() => (token && (type === 1))
                ? <Component {...rest} />
                : <Redirect to="/" />
            }
        />
    )
}