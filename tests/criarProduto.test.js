const fs = require('fs');
const produtosSite = require('../databases/Produtos.json');

function criarProduto(produto) {

  // Encontra o último ID dos produtos existentes e adiciona 1 para gerar um novo ID
  const ultimoID = produtosSite.length > 0 ? Math.max(...produtosSite.map(p => p.id)) : 0;
  const id = ultimoID + 1;

  // Adiciona o ID ao objeto de produto
  produto.id = id;

  // Adiciona o produto ao array de produtos
  produtosSite.push(produto);

  // Escreve o array atualizado de produtos no arquivo JSON
  fs.writeFileSync('./databases/Produtos.json', JSON.stringify(produtosSite));

  // Retorna o produto criado
  return produto;
}

// Cria um novo produto para ser adicionado ao array de produtos existentes
const novoProduto = { id: "15", nome: "Novo produto", preco: 24.99 };

// Chama a função criarProduto e passa o novo produto como parâmetro
const produtoCriado = criarProduto(novoProduto);

// Verifica se o produto foi criado e adicionado ao array de produtos
if (produtoCriado && produtosSite.includes(produtoCriado)) {
  console.log(`O produto ${produtoCriado.nome} foi criado e adicionado ao array de produtos.`);
} else {
  console.log("Ocorreu um erro ao criar o produto.");
}