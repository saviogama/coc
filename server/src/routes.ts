import express from 'express';
import UsersController from './controllers/UsersController';
import PatientsController from './controllers/PatientsController';
import ConsultaController from './controllers/ConsultaController';
import AvaliacaoController from './controllers/AvaliacaoController';

const routes = express.Router();
const usersController = new UsersController();
const patientsController = new PatientsController();
const consultaController = new ConsultaController();
const avaliacaoController = new AvaliacaoController();

routes.post('/login', usersController.login); //ok
routes.get('/privileges', usersController.index); //apenas testes
routes.post('/privileges', usersController.create); //ok

routes.get('/patients', patientsController.index); //ok
routes.post('/patients', patientsController.create); //ok
routes.put('/patients', patientsController.update); //ok
routes.delete('/patients', patientsController.delete); //ok

routes.get('/consulta', consultaController.index); //ok
routes.post('/consulta', consultaController.create); //ok

routes.get('/avaliacao', avaliacaoController.index); //ok
routes.post('/avaliacao', avaliacaoController.create); //ok

export default routes;
