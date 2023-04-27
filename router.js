// Importar express
const express = require('express');
const multer = require('multer');
const AdminController = require('./controllers/AdminController');
const GeralController = require("./controllers/GeralController");
const ProdutosController = require("./controllers/ProdutosController");
const UsuarioController = require("./controllers/UsuarioController");
const checaAutenticacaoAdmin = require('./middlewares/checaAutenticacaoAdmin');
const checaAutenticacaoUsuario = require('./middlewares/checaAutenticacaoUsuario');
const validacoesExpress = require('./helpers/validacoesExpress');

const router = express.Router()

// Configuração Multer
const upload = multer({dest: 'public/img/produtos'})

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

router.get("/produto/:slugProduto", ProdutosController.show);

router.get("/categorias/:slugCategoria?/:area?", ProdutosController.listagem);
// o '?' torna o parametro dispensavel, podendo acessar o url '/categorias'

router.get("/cadastro", UsuarioController.showCadastro);
router.post("/cadastro",UsuarioController.criarCadastro);
router.get("/painelUsuario", checaAutenticacaoUsuario, UsuarioController.showPainelUsuario);
// router.get("/statusDePedidos", UsuarioController.showstatusDePedido);


// Admin Routers
router.get("/admin/", AdminController.showLogin);
router.post("/admin/login", validacoesExpress.login ,AdminController.login);
router.get("/admin/logout", UsuarioController.logout);
router.get("/admin/clientes", checaAutenticacaoAdmin, AdminController.showClientes);
router.get("/admin/produtos", checaAutenticacaoAdmin, AdminController.showProdutos);
router.get("/admin/pedidos", checaAutenticacaoAdmin, AdminController.showPedidos);
router.get("/admin/produtos/criar", checaAutenticacaoAdmin, AdminController.showCriarProduto);
router.post("/admin/produtos/criar", checaAutenticacaoAdmin, upload.array('img', 10), validacoesExpress.criacaoProduto ,AdminController.gravaProduto);
router.get("/admin/produtos/:id/editar", checaAutenticacaoAdmin,  AdminController.showEditarProduto);
router.put("/admin/produtos/:id/editar", checaAutenticacaoAdmin, upload.array('img', 10), AdminController.editarProduto);
router.delete("/admin/produtos/:id/delete", checaAutenticacaoAdmin,AdminController.removeProduto);
router.get("/admin/categorias", checaAutenticacaoAdmin, AdminController.showCategorias)
router.get("/admin/categorias/:id/editar", checaAutenticacaoAdmin,  AdminController.showEditarCategoria);
router.put("/admin/categorias/:id/editar", checaAutenticacaoAdmin,  upload.single('img'), AdminController.editarCategoria);
router.get("/admin/categorias/criar", checaAutenticacaoAdmin, AdminController.showCriarCategoria);
router.post("/admin/categorias/criar", checaAutenticacaoAdmin, upload.single('img'), AdminController.gravarCategoria);
router.delete("/admin/categorias/:id/delete", checaAutenticacaoAdmin,AdminController.removeCategoria);
router.get('/admin/usuarios', checaAutenticacaoAdmin, AdminController.showUsuarios)
router.get('/admin/usuarios/:id/editar', checaAutenticacaoAdmin, AdminController.showEditarUsuario)
router.put('/admin/usuarios/:id/editar', checaAutenticacaoAdmin, AdminController.editarUsuario)
router.delete('/admin/usuarios/:id/delete', checaAutenticacaoAdmin, AdminController.removeUsuario)
router.get('/admin/usuarios/criar', checaAutenticacaoAdmin, AdminController.showCriaUsuario)
router.post('/admin/usuarios/criar', checaAutenticacaoAdmin, AdminController.gravarUsuario)

// Exportar o roteador
module.exports = router;