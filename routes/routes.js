var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/user',UserController.create); // criar users
router.get('/user',AdminAuth,UserController.index); //listar os users
router.get('/user/:id',AdminAuth,UserController.findUserId);
router.get('/user/:name',AdminAuth,UserController.findUserName);
router.put('/user',AdminAuth,UserController.edit); // esta rota edita o usuário
router.delete('/user/:id',AdminAuth,UserController.remove); // esta rota deleta um usuário
router.post('/login',UserController.login);


router.post('/funcionario',AdminAuth,UserController.createFuncionario);
router.get('/funcionario',AdminAuth,UserController.allFuncionarios);
router.put('/funcionario/:id',AdminAuth,UserController.desligarFuncionario);

module.exports = router;