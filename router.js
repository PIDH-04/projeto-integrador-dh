const express = require('express');
const router = express.Router();
const ProdutosController = require("./controllers/ProdutosController");

router.get("/painelUsuario", (req, res) => {
    return res.sendFile(__dirname + "/views/painelUsuario.html")
})

router.get("/statusDePedidos", (req, res) => {
    return res.sendFile(__dirname + "/views/statusDePedidos.html")
})


router.get('/login', (req, res) => {
    return res.sendFile(__dirname + '/views/login.html')
})



router.get("/", (req, res) => {
    return res.sendFile(__dirname + "/views/home.html");
});

router.get("/header", (req, res) => {
    return res.sendFile(__dirname + "/views/header.html");
});

router.get("/categorias/:categoria", (req, res) => {
    return res.sendFile(__dirname + "/views/listagemProdutos.html");
});

router.get("/master", (req, res) => {
    return res.sendFile(__dirname + "/views/master.html");
});

router.get("/produto", ProdutosController.show);

router.get("/carrinho", (req, res) => {
    return res.sendFile(__dirname + "/views/carrinho.html");
});

router.get("/painelUsuario", (req, res) => {
    return res.sendFile(__dirname + "/views/painelUsuario.html")
});

router.get('/finalizacao-compra', (req, res) => {
    return res.sendFile(__dirname + '/views/finalizacaoCompra.html')
})

router.get('/checkoutpagamento', (req, res) => {
    return res.sendFile(__dirname + '/views/checkoutPagamento.html')
})

router.get("/checkoutDeEndereco", (req, res) => {
    return res.sendFile(__dirname + "/views/checkoutEndereco.html");
});

router.get('/cadastro', (req, res) => {
    return res.sendFile(__dirname + '/views/cadastro.html')
})

module.exports = router;