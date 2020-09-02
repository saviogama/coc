import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NewPacient from './pages/NewPacient';
import Consultas from './pages/Consultas';
import NewConsulta from './pages/NewConsulta';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/register" component={NewPacient} />
            <Route path="/consultas" component={Consultas} />
            <Route path="/new" component={NewConsulta} />
        </BrowserRouter>
    )
}
