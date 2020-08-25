import express from 'express';
import UsersController from './controllers/UsersController';
import PatientsController from './controllers/PatientsController';
import ConsultaController from './controllers/ConsultaController';
import AvaliacaoController from './controllers/AvaliacaoController';
import TodayController from './controllers/TodayController';

const routes = express.Router();
const usersController = new UsersController();
const patientsController = new PatientsController();
const consultaController = new ConsultaController();
const avaliacaoController = new AvaliacaoController();
const todayController = new TodayController();

routes.get('/privileges', usersController.index); //ok
routes.post('/privileges', usersController.create); //ok
routes.post('/login', usersController.login); //ok

routes.get('/patients', patientsController.index); //ok
routes.post('/patients', patientsController.create); //ok
routes.put('/patients', patientsController.update); //ok
routes.delete('/patients', patientsController.delete); //ok

routes.get('/consulta', consultaController.index); //ok
routes.post('/consulta', consultaController.create); //ok
routes.put('/consulta', consultaController.update); //ok
routes.delete('/consulta', consultaController.delete); //ok

routes.get('/today', todayController.index); //ok
routes.post('/today', todayController.create); //ok
routes.delete('/today', todayController.delete); //ok

routes.get('/avaliacao', avaliacaoController.index); //ok
routes.post('/avaliacao', avaliacaoController.create); //ok
routes.put('/avaliacao', avaliacaoController.update); //ok

export default routes;
