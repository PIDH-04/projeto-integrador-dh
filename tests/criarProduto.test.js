// Importar o arquivo JSON 
const produtosSite = require('../databases/Produtos.json');

// Defini a função criarProduto, que recebe um objeto de produto como parâmetro

function criarProduto(produto) {

    // Encontra o último ID dos produtos existentes e adicionar 1 para gerar um novo ID
    const ultimoID = produtosSite.length > 0 ? Math.max(...produtosSite.map(p => p.id)) : 0;
    const id = ultimoID + 1;

    // Adiciona o ID ao objeto de produto
    produto.id = id;

    // Adiciona o produto ao array de produtos
    produtosSite.push(produto);

    // Retorna o produto criado
    return produto;
}

// Cria um novo produto para ser adicionado ao array de produtos existentes
const novoProduto = { nome: "Novo produto", preco: 24.99 };

// Chama a função criarProduto e passar o novo produto como parâmetro
const produtoCriado = criarProduto(novoProduto);

// Verifica se o produto foi criado e adicionado ao array de produtos
if (produtoCriado && produtosSite.includes(produtoCriado)) {
    console.log(`O produto ${produtoCriado.nome} foi criado e adicionado ao array de produtos.`);
} else {
    console.log("Ocorreu um erro ao criar o produto.");
}