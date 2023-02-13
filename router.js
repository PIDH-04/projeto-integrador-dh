// Importar express
const express = require('express');
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

router.get("/carrinho", UsuarioController.carrinho);

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

// Exportar o roteador
module.exports = router;