const produtosSite = require('../databases/Produtos.json');

function listarProdutos() {
    return produtosSite;

}

const resultado = listarProdutos(produtosSite);
console.log(resultado);