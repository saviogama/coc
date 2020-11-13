import express from 'express';
import UsersController from './controllers/UsersController';
import PatientsController from './controllers/PatientsController';
import AppointmentsController from './controllers/AppointmentsController';
import EvaluationsController from './controllers/EvaluationsController';
import TodayController from './controllers/TodayController';
import HistoryController from './controllers/HistoryController';

const routes = express.Router();
const usersController = new UsersController();
const patientsController = new PatientsController();
const appointmentsController = new AppointmentsController();
const evaluationsController = new EvaluationsController();
const todayController = new TodayController();
const historyController = new HistoryController();

routes.get('/privileges', usersController.index); //ok
routes.post('/privileges', usersController.create); //ok
routes.post('/login', usersController.login); //ok

routes.get('/patients-all', patientsController.all); //ok
routes.get('/patients-name', patientsController.name); //ok
routes.get('/patients/:patient', patientsController.index); //ok
routes.post('/patients', patientsController.create); //ok
routes.put('/patients/:patient', patientsController.update); //ok
routes.delete('/patients/:patient', patientsController.delete); //ok

routes.get('/appointments-patient/:appointment', appointmentsController.patient); //ok
routes.get('/appointments/:appointment', appointmentsController.index); //ok
routes.post('/appointments', appointmentsController.create); //ok
//routes.put('/appointments', appointmentsController.update);
//routes.delete('/appointments', appointmentsController.delete);

routes.get('/today/:appointment', todayController.appointment); //ok
routes.get('/today', todayController.index); //ok
routes.delete('/today/:today', todayController.delete); //ok

routes.get('/history', historyController.index); //ok
routes.delete('/history/', historyController.delete); //ok

routes.get('/evaluations/:evaluation', evaluationsController.index); //ok
routes.post('/evaluations', evaluationsController.create); //ok
//routes.put('/evaluations', evaluationsController.update);

export default routes;
