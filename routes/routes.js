var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
// ruta para buscar usuario
router.route('/user/search').post(userController.findUserControllerFunc);
//ruta para eliminar
router.route('/user/delete').delete(userController.deleteUseDBServiceControllerFunc);
//ruta para actualizar
router.route('/user/update').put(userController.updateUseDBServiceControllerFunc);


module.exports = router;
