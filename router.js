// Importar express
const express = require('express');
const AdminController = require('./controllers/AdminController');
const GeralController = require("./controllers/GeralController");
const ProdutosController = require("./controllers/ProdutosController");
const UsuarioController = require("./controllers/UsuarioController");
const checaAutenticacaoAdmin = require('./middlewares/checaAutenticacaoAdmin');
const checaAutenticacaoUsuario = require('./middlewares/checaAutenticacaoUsuario');

const router = express.Router()


// Definir rotas
router.get("/master", (req, res) => {
    return res.sendFile(__dirname + "/views/master.html")
});

router.get("/", GeralController.home);

router.get('/finalizacao-compra', checaAutenticacaoUsuario, UsuarioController.finalizacaoCompra);

router.get("/carrinho", ProdutosController.showCarrinho);

router.get('/login', UsuarioController.showLogin);
router.post('/login', UsuarioController.login);

router.get('/login/email', UsuarioController.loginEmail);

router.get('/checkoutpagamento', checaAutenticacaoUsuario, UsuarioController.checkoutPagamento);

router.get("/checkoutDeEndereco", checaAutenticacaoUsuario, UsuarioController.checkoutEndereco);

router.get("/produto/:idDoProduto", ProdutosController.show);

router.get("/categorias/:link", ProdutosController.listagem);

router.get("/cadastro", UsuarioController.showCadastro);
router.get("/painelUsuario", checaAutenticacaoUsuario, UsuarioController.showPainelUsuario);
// router.get("/statusDePedidos", UsuarioController.showstatusDePedido);


// Admin Routers
router.get("/admin/", AdminController.showLogin);
router.post("/admin/login", AdminController.login);
router.get("/admin/logout", UsuarioController.logout);
router.get("/admin/clientes", checaAutenticacaoAdmin, AdminController.showClientes);
router.get("/admin/produtos", checaAutenticacaoAdmin, AdminController.showProdutos);
router.get("/admin/pedidos", checaAutenticacaoAdmin, AdminController.showPedidos);
router.get("/admin/produtos/criar", checaAutenticacaoAdmin, AdminController.showCriarProduto);
router.get("/admin/produtos/:id/editar", checaAutenticacaoAdmin, AdminController.showEditarProduto);

// Exportar o roteador
module.exports = router;