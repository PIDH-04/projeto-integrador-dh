const produtosSite = require('../databases/Produtos.json');

function produtoId(id) {
  const produto = produtosSite.find(c => c.id === id);
  return produto || null;
}

// Teste: a função retorna o produto correto com base no ID
const produto = produtoId("Cadeira Saarinen");
if (produto) {
  console.log(JSON.stringify(produto));
} else {
  console.log("Não foi possível encontrar o produto com o ID fornecido.");
}