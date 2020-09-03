import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserRoute from './routes/UserRoute';
import DocRoute from './routes/DocRoute';
import Logon from './pages/Logon';
import UserHome from './pages/UserHome';
import NewPatient from './pages/NewPatient';
import UserAppointments from './pages/UserAppointments';
import NewAppointment from './pages/NewAppointment';
import DocAppointments from './pages/DocAppointments';
import Evaluation from './pages/Evaluation';
import GenerateDocs from './pages/GenerateDocs';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Logon} />
            <UserRoute path="/user" component={UserHome} />
            <UserRoute path="/register" component={NewPatient} />
            <UserRoute path="/appointments" component={UserAppointments} />
            <UserRoute path="/appointments/new" component={NewAppointment} />
            <Route path="/home" component={DocAppointments} />
            <Route path="/evaluation" component={Evaluation} />
            <DocRoute path="/generate" component={GenerateDocs} />
        </Switch>
    )
}
