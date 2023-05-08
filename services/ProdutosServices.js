const { Produtos } = require('../databases/models');

//listar todos os produtos
async function listarProdutos() {
  const produtos = Produtos.findAll();
  return produtos
}

//listar produto de id especifico
async function mostrarProdutoId(idProduto) {
  const produto = await Produtos.findByPk(idProduto);
  return produto
}

//lista os produtos filtrado(a partir dos parametros da url)
async function listarProdutosFiltrados(idCategoria, idArea) {
    let filtro = {};
    if (idCategoria !== undefined) {
      filtro = {
        where: {
          categorias_id: idCategoria
        }
      }
    }
    if (idArea !== undefined) {
      filtro.include = [{
        model: Areas,
        where: { id: idArea }
      }]
    }
  
    const produtosFiltrados = await Produtos.findAll(filtro);
    return produtosFiltrados;
  }

async function criarProduto(produto) {

  // Encontra o último ID dos produtos existentes e adiciona 1 para gerar um novo ID
  let id = 0;

  if (produtos.length > 0) {
    const ultimoID = produtos[produtos.length - 1].id
    id = ultimoID + 1
  } else {
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

module.exports = {
  criarProduto,
  editarProduto,
  listarProdutos,
  mostrarProdutoId,
  excluirProdutoId,
  listarProdutosFiltrados
}