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

  //cria produto
async function criarProduto(infosProduto) {
  let produtoNovo = await Produtos.create(infosProduto);
}

//deleta produto
async function excluirProdutoId(idProduto) {
  let produtoParaRemover = await Produtos.destroy({ where: { id: idProduto } });

  if (produtoParaRemover == 0) {
    throw new Error("Produto inexistente");
  }
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



module.exports = {
  criarProduto,
  editarProduto,
  listarProdutos,
  mostrarProdutoId,
  excluirProdutoId,
  listarProdutosFiltrados
}