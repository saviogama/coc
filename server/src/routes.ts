import express from 'express';
import UsersController from './controllers/UsersController';
import PatientsController from './controllers/PatientsController';
import AppointmentsController from './controllers/AppointmentsController';
import EvaluationsController from './controllers/EvaluationsController';
import TodayController from './controllers/TodayController';

const routes = express.Router();
const usersController = new UsersController();
const patientsController = new PatientsController();
const appointmentsController = new AppointmentsController();
const evaluationsController = new EvaluationsController();
const todayController = new TodayController();

routes.get('/privileges', usersController.index); //ok
routes.post('/privileges', usersController.create); //ok
routes.post('/login', usersController.login); //ok

routes.get('/patients-all', patientsController.all); //ok
routes.get('/patients', patientsController.index); //ok
routes.post('/patients', patientsController.create); //ok
routes.put('/patients/:id', patientsController.update); //ok
routes.delete('/patients/:id', patientsController.delete); //ok

routes.get('/appointments/:appointment', appointmentsController.index); //ok
routes.post('/appointments', appointmentsController.create); //ok
//routes.put('/appointments', appointmentsController.update);
//routes.delete('/appointments', appointmentsController.delete);

routes.get('/today/:appointment', todayController.appointment); //ok
routes.get('/today', todayController.index); //ok
routes.delete('/today/:today', todayController.delete); //ok

routes.get('/evaluations/:evaluation', evaluationsController.index); //ok
routes.post('/evaluations', evaluationsController.create); //ok
//routes.put('/evaluations', evaluationsController.update);

export default routes;
