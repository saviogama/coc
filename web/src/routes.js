import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Form from './pages/Form';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/new" component={Form} />
            <Route path="/edit" component={Form} />
        </BrowserRouter>
    )
}
