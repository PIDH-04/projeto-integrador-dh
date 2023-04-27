const produtos = require('../databases/Produtos.json');
const fs = require('fs');
const {Produtos} = require('../databases/models');


function criarProduto(produto) {

  // Encontra o último ID dos produtos existentes e adiciona 1 para gerar um novo ID
  let id = 0;
  
  if(produtos.length > 0){
    const ultimoID = produtos[produtos.length -1].id
    id = ultimoID + 1
  }else {
    id = 1;
  }

  // Adiciona o ID ao objeto de produto
  produto.id = id;

  // Adiciona o produto ao array de produtos
  produtos.push(produto);

  // Escreve o array atualizado de produtos no arquivo JSON
  fs.writeFileSync('./databases/Produtos.json', JSON.stringify(produtos, null, 4));

  // Retorna o produto criado
  return produto;
}

function editarProduto(id, novoProduto) {

  // Encontrar o índice do produto a ser editado pelo ID
  const index = produtos.findIndex(p => p.id == id);
  if (index !== -1) {

    // Atualizar o produto com os dados do novo produto
    const produtoAtualizado = {
      id: produtos[index].id,
      ...novoProduto
    };

    // Substituir o produto antigo pelo produto atualizado no array de produtos
    produtos[index] = produtoAtualizado;
    // Escrever os dados atualizados no arquivo JSON
    fs.writeFileSync('./databases/Produtos.json', JSON.stringify(produtos, null, 4));

    // Retornar o produto atualizado
    return produtoAtualizado;
  } else {

    // Retornar null se não encontrar o produto a ser editado
    return null;
  }
}

async function listarProdutos() {
  return await Produtos.findAll();
}

function mostrarProdutoSlug(slug) {
  const produto = produtos.find(c => c.slug === slug);
  return produto || null;
}

function mostrarProdutoId(id) {
  const produto = produtos.find(c => c.id == id);
  return produto || null;
}

function excluirProdutoId(id) {
  // Encontrar o índice do produto a ser excluído pelo ID
  const indiceProduto = produtos.findIndex(p => p.id == id);

  if (indiceProduto !== -1) {
    // Remover o produto do array de produtos
    produtos.splice(indiceProduto, 1);

    // Escrever os dados atualizados no arquivo JSON
    fs.writeFileSync('./databases/Produtos.json', JSON.stringify(produtos, null, 4));

    // Retornar true se o produto foi excluído com sucesso
    return true;
  } else {
    // Retornar false se não encontrar o produto a ser excluído
    return false;
  }
}

function listarProdutosCategoria(categoria) {
  const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
  return produtosFiltrados.length > 0 ? produtosFiltrados : [];
}

  function criaSlug(nome) {
    let slug = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    slug = slug.replaceAll(' ', '-')
    slug = slug.replaceAll("'", '-')
    return slug
  }

function listarProdutosFiltrados(slugCategoria, area){
  if (slugCategoria && area) {
    const produtosFiltrados = produtos.filter(produto => produto.categoria === slugCategoria && produto.area === area);
    return produtosFiltrados
  }else if(slugCategoria) {
    const produtosFiltrados = produtos.filter(produto => produto.categoria === slugCategoria);
    return produtosFiltrados
  }else if(area) {
    const produtosFiltrados = produtos.filter(produto => produto.area === area);
    return produtosFiltrados
  }else{
    return produtos
  }
  }



  module.exports = {
    criarProduto,
    editarProduto,
    listarProdutos,
    mostrarProdutoSlug,
    mostrarProdutoId,
    excluirProdutoId,
    listarProdutosCategoria,
    criaSlug,
    listarProdutosFiltrados
  }