const produtosSite = require('../databases/Produtos.json');

function produtoId(id) {
    const produto = produtosSite.find(c => c.id === id);
    if (produto) {
      return produto;
    } else {
      return null;
    }
  }
  
  // Teste: a função retorna o produto correto com base no ID
  const produto = produtoId();
  if (produto) {
    console.log(`O produto com ID ${produto.id} é ${produto.nome}`);
  } else {
    console.log("Não foi possível encontrar o produto com o ID fornecido.");
  }