// Importar express
const express = require('express');
const AdminController = require('./controllers/AdminController');
const GeralController = require("./controllers/GeralController");
const ProdutosController = require("./controllers/ProdutosController");
const UsuarioController = require("./controllers/UsuarioController");

// Criar o roteador
const router = express.Router();

// Definir rotas
router.get("/master", (req, res) => {
    return res.sendFile(__dirname + "/views/master.html")
});

router.get("/", GeralController.home);

router.get('/finalizacao-compra', UsuarioController.finalizacaoCompra);

router.get("/carrinho", ProdutosController.showCarrinho);

router.get('/login', UsuarioController.login);

router.get('/login/email', UsuarioController.loginEmail);

router.get('/checkoutpagamento', UsuarioController.checkoutPagamento);

router.get("/checkoutDeEndereco", UsuarioController.checkoutEndereco);

router.get("/produto", ProdutosController.show);

router.get("/categorias/:categoria", ProdutosController.listagem);

router.get("/statusDePedidos", (req, res) => {
    return res.sendFile(__dirname + "/views/statusDePedidos.html")
});

router.get("/cadastro", UsuarioController.showCadastro);

router.get("/painelUsuario", (req, res) => {
    return res.sendFile(__dirname + "/views/painelUsuario.html")
});

// Admin Routers
router.get("/admin/login", AdminController.showLogin);
router.get("/admin/clientes", AdminController.showClientes);

// Exportar o roteador
module.exports = router;