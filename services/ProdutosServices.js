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

//edita um produto
async function editarProduto(idProduto, novasInfos) {
  //acha o produto a ser editado pelo id
  const produto = await Produtos.findByPk(idProduto);

  //da error se o id do produto não corresponder a nenhum
  if (produto === undefined) {
    throw new Error("Produto inexistente");
  };

  await produto.update(novasInfos);
}

module.exports = {
  criarProduto,
  editarProduto,
  listarProdutos,
  mostrarProdutoId,
  excluirProdutoId,
  listarProdutosFiltrados
}