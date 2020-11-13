import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserRoute } from './routes/UserRoute';
import { MedRoute } from './routes/MedRoute';
import Logon from './pages/Logon';
import UserHome from './pages/UserHome';
import History from './pages/History';
import HistoryDetails from './pages/HistoryDetails';
import NewPatient from './pages/NewPatient';
import EditPatient from './pages/EditPatient';
import UserAppointments from './pages/UserAppointments';
import UserAppointmentsEnd from './pages/UserAppointmentsEnd';
import NewAppointment from './pages/NewAppointment';
import DocAppointments from './pages/DocAppointments';
import Evaluation from './pages/Evaluation';
import Review from './pages/Review';
import RenderAtestado from './pages/RenderAtestado';
import RenderPrescricao from './pages/RenderPrescricao';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Logon} />
            <UserRoute path="/user" component={UserHome} />
            <UserRoute path="/history/:id" component={History} />
            <UserRoute path="/details/:id" component={HistoryDetails} />
            <UserRoute path="/register" component={NewPatient} />
            <UserRoute path="/edit/:patient" component={EditPatient} />
            <UserRoute path="/appointments" component={UserAppointments} />
            <UserRoute path="/appointments-new" component={NewAppointment} />
            <UserRoute path="/appointments-end" component={UserAppointmentsEnd} />
            <MedRoute path="/home" component={DocAppointments} />
            <MedRoute path="/evaluation/:id" component={Evaluation} />
            <MedRoute path="/review/:id" component={Review} />
            <MedRoute path="/atestado/:id" component={RenderAtestado} />
            <MedRoute path="/prescricao/:id" component={RenderPrescricao} />
        </Switch>
    )
}
