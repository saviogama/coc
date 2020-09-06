import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import StoreContext from '../contexts/context';

export const UserRoute = ({ component: Component, ...rest }) => {
    const { token, type } = useContext(StoreContext);

    return (
        <Route
            {...rest}
            render={() => (token && (type === 2))
                ? <Component {...rest} />
                : <Redirect to="/" />
            }
        />
    )
}