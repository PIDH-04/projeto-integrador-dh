// Importar express
const express = require('express');
const multer = require('multer');
const AdminController = require('./controllers/AdminController');
const GeralController = require("./controllers/GeralController");
const ProdutosController = require("./controllers/ProdutosController");
const ClientesController = require("./controllers/ClientesController");
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

router.get('/finalizacao-compra', checaAutenticacaoUsuario, ClientesController.finalizacaoCompra);

router.get("/carrinho", ProdutosController.showCarrinho);

router.get('/login', ClientesController.showLogin);
router.post('/login', ClientesController.login);

router.get('/login/email', ClientesController.loginEmail);

router.get('/checkoutpagamento', checaAutenticacaoUsuario, ClientesController.checkoutPagamento);

router.get("/checkoutDeEndereco", checaAutenticacaoUsuario, ClientesController.checkoutEndereco);

router.get("/produto/:idProduto", ProdutosController.show);

router.get("/categorias/:idCategoria?/:idArea?", ProdutosController.listagem);
// o '?' torna o parametro dispensavel, podendo acessar o url '/categorias'

router.get("/cadastro", ClientesController.showCadastro);
router.post("/cadastro",ClientesController.criarCadastro);
router.get("/painelUsuario", checaAutenticacaoUsuario, ClientesController.showPainelUsuario);
// router.get("/statusDePedidos", ClientesController.showstatusDePedido);


// Admin Routers
router.get("/admin/", AdminController.showLogin);
router.post("/admin/login", validacoesExpress.login ,AdminController.login);
router.get("/admin/logout", ClientesController.logout);
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