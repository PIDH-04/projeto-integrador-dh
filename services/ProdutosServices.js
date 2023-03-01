const produtosSite = require('../databases/Produtos.json');
const fs = require('fs');


function categoriaId(id) {

  const categoriaEncontrada = CategoriasServices.categorias.find(categoria => categoria.id === id);

  if (categoriaEncontrada) {

    return categoriaEncontrada;
  } else {

    return null;
  }
}

function criarProduto(produto) {

  // Encontra o último ID dos produtos existentes e adiciona 1 para gerar um novo ID
  const ultimoID = produtosSite[produtosSite.length -1].id
  const id = ultimoID + 1;


  // Adiciona o ID ao objeto de produto
  produto.id = id;

  // Adiciona o produto ao array de produtos
  produtosSite.push(produto);

  // Escreve o array atualizado de produtos no arquivo JSON
  fs.writeFileSync('./databases/Produtos.json', JSON.stringify(produtosSite,null,4));

  // Retorna o produto criado
  return produto;
}

function editarProduto(id, novoProduto) {

  // Encontrar o índice do produto a ser editado pelo ID
  const index = produtosSite.findIndex(p => p.id === id);
  if (index !== -1) {

    // Atualizar o produto com os dados do novo produto
    const produtoAtualizado = {
      ...produtosSite[index],
      ...novoProduto
    };

    // Substituir o produto antigo pelo produto atualizado no array de produtos
    produtosSite[index] = produtoAtualizado;

    // Escrever os dados atualizados no arquivo JSON
    fs.writeFileSync('./databases/Produtos.json', JSON.stringify(produtosSite,null,4));

    // Retornar o produto atualizado
    return produtoAtualizado;
  } else {

    // Retornar null se não encontrar o produto a ser editado
    return null;
  }
}

function listarProdutos() {
  return produtosSite;

}

function mostrarProdutoId(id) {
  const produto = produtosSite.find(c => c.id === id);
  return produto || null;
}


module.exports = {
  
  categoriaId,
  criarProduto,
  editarProduto,
  listarProdutos,
  mostrarProdutoId,

}