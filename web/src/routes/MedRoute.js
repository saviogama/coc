import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import StoreContext from '../contexts/context';

export const MedRoute = ({ component: Component, ...rest }) => {
    const { token } = useContext(StoreContext);

    return (
        <Route
            {...rest}
            render={() => token
                ? <Component {...rest} />
                : <Redirect to="/" />
            }
        />
    )
}