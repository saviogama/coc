import express from 'express';
import UsersController from './controllers/UsersController';
import PatientsController from './controllers/PatientsController';
import AvlController from './controllers/AvlController';
import TonometriaController from './controllers/TonometriaController';
import InspecaoController from './controllers/InspecaoController';
import RefracaoController from './controllers/RefracaoController';
import BiomicroscopiaController from './controllers/BiomicroscopiaController';

const routes = express.Router();
const usersController = new UsersController();
const patientsController = new PatientsController();
const avlController = new AvlController();
const tonometriaController = new TonometriaController();
const inspecaoController = new InspecaoController();
const refracaoController = new RefracaoController();
const biomicroscopiaController = new BiomicroscopiaController();

routes.post('/login', usersController.login); //ok
routes.get('/privileges', usersController.index); //apenas testes
routes.post('/privileges', usersController.create); //ok

routes.get('/patients', patientsController.index); //ok
routes.post('/patients', patientsController.create); //ok
routes.put('/patients', patientsController.update); //ok
routes.delete('/patients', patientsController.delete); //ok

routes.get('/avl', avlController.index); //ok
routes.post('/avl', avlController.create); //ok

routes.get('/tonometria', tonometriaController.index); //ok
routes.post('/tonometria', tonometriaController.create); //ok

routes.get('/inspecao', inspecaoController.index); //ok
routes.post('/inspecao', inspecaoController.create); //ok

routes.get('/refracao', refracaoController.index); //ok
routes.post('/refracao', refracaoController.create); //ok

routes.get('/biomicroscopia', biomicroscopiaController.index); //ok
routes.post('/biomicroscopia', biomicroscopiaController.create); //ok

export default routes;
