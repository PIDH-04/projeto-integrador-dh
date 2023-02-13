// Importar express
const express = require('express');
const GeralController = require("./controllers/GeralController");
const ProdutosController = require("./controllers/ProdutosController");

<<<<<<< HEAD
const painelUsuario = require("./controllers/PainelUsuario");

=======
// Criar o roteador
const router = express.Router();
>>>>>>> 2f53ed2cb2dd8c11570ae07491ded6bead31959f

// Definir rotas
router.get("/master", GeralController.master);

router.get("/header", GeralController.header);

router.get("/", GeralController.home);

router.get("/produto", ProdutosController.show);

router.get("/categorias/:categoria", (req, res) => {
    return res.sendFile(__dirname + "/views/listagemProdutos.html");
});

router.get('/cadastro', (req, res) => {
    return res.sendFile(__dirname + '/views/cadastro.html')
});

router.get("/painelUsuario", (req, res) => {
    return res.sendFile(__dirname + "/views/painelUsuario.html")
});

router.get("/statusDePedidos", (req, res) => {
    return res.sendFile(__dirname + "/views/statusDePedidos.html")
});

router.get('/login', (req, res) => {
    return res.sendFile(__dirname + '/views/login.html')
});

router.get("/carrinho", (req, res) => {
    return res.sendFile(__dirname + "/views/carrinho.html");
});


router.get('/finalizacao-compra', (req, res) => {
    return res.sendFile(__dirname + '/views/finalizacaoCompra.html')
});

router.get('/checkoutpagamento', (req, res) => {
    return res.sendFile(__dirname + '/views/checkoutPagamento.html')
});

router.get("/checkoutDeEndereco", (req, res) => {
    return res.sendFile(__dirname + "/views/checkoutEndereco.html");
});

<<<<<<< HEAD
router.get('/cadastro', (req, res) => {
    return res.sendFile(__dirname + '/views/cadastro.html')
})

router.get("/painelUsuario", painelUsuario.show);

=======
// Exportar o roteador
>>>>>>> 2f53ed2cb2dd8c11570ae07491ded6bead31959f
module.exports = router;