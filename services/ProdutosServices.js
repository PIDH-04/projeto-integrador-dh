const Produtos = require('../databasesCategorias.json');
const produtosSite = require('../databases/Produtos.json');



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
    produtos.push(produtosSite);

    // Retornar o produto criado
    return produto;
}

function alterarProduto(id, novoProduto) {
    const dados = fs.readFileSync('Produtos.json');
    const produtos = JSON.parse(dados);

    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === id) {
            // Produto encontrado, fazer a alteração
            produtos[i] = novoProduto;
            break;
        }
    }
    fs.writeFileSync('produtos.json', JSON.stringify(produtos));

}

function categoria() {
    const produtosCategorias = produtos.filter(p => p.categoria === categoria);

    return produtosCategorias;

}

function editarProduto(id, novoProduto) {
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        // Atualizar o produto
        produtos[index] = {
            id: id,
            nome: novoProduto.nome || produtos[index].nome,
            categoria: novoProduto.categoria || produtos[index].categoria,
            preco: novoProduto.preco || produtos[index].preco,
        };
        return produtos[index];
    } else {
        return null;
    }
}

function listar() {
    return produtos;

}

module.exports = {
    Produtos,
    produtosSite
}