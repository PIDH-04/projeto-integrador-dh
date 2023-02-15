const Produtos = require('../databasesCategorias.json');


function listarProdutos() {
    return Produtos;

}

function getprodutById(id) {
    const Produtos = Produtos.find(c => c.id === id);
    if (Produtos) {
        return Produtos;
    } else {
        return null;
    }

}

function criarProduto(produto) {

    // Gerar um ID único para o produto

    const ultimoID = produto.length > 0 ? Math.max(produto.map(p => p.id)) : 0;
    const id = ultimoID + 1;

    // Adicionar o ID ao objeto de produto
    produto.id = id;

    // Adicionar o produto ao objeto JSON
    produtos.push(produto);

    // Retornar o produto criado
    return produto;
}


function categoria() {
    const produtosCategorias = produtos.filter(p => p.categoria === categoria);

    return produtosCategorias;

}

function listar() {
    return produtos;

}

module.exports = Produtos;