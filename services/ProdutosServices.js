const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Produtos } = require('../databases/models');
const { Areas } = require('../databases/models');
const { Visitas } = require('../databases/models');
const { Imagens } = require('../databases/models');
const { Pedidos } = require('../databases/models');

//listar todos os produtos
async function listarProdutos() {
  const produtos = Produtos.findAll({ include: 'imagens' });
  return produtos
}

//listar produto de id especifico
async function mostrarProdutoId(idProduto) {
  const produto = await Produtos.findByPk(idProduto, { include: 'imagens' });
  return produto
}

//lista os produtos filtrado(a partir dos parametros da url)
async function listarProdutosFiltrados(idCategoria, idArea) {
  let filtro = {};
  if (idCategoria !== undefined && 1) {
    filtro = {
      where: {
        categorias_id: idCategoria
      },
      include: ["imagens"]
    }
  }
  if (idCategoria == 1) {
    filtro = {
      model: Produtos,
      include: ["imagens"]
    };
  }
  if (idArea !== undefined) {
    filtro.include = [{
      model: Areas,
      where: { id: idArea },
      as: 'areas'
    }, "imagens"]
  }

  const produtosFiltrados = await Produtos.findAll(filtro);

  return produtosFiltrados;
}

//ordenacao dos produtos
async function ordenarProdutos(ordenacao, idCategoria, idArea) {
  const produtosFiltrados = await listarProdutosFiltrados(idCategoria, idArea);

  if (ordenacao === 'menor') {
    const produtosOrdenados = await Produtos.findAll({
      where: {
        id: produtosFiltrados.map(produto => produto.id)
      },
      order: [['preco', 'ASC']]
    });

    return produtosOrdenados;
  }
  if (ordenacao === 'maior') {
    const produtosOrdenados = await Produtos.findAll({
      where: {
        id: produtosFiltrados.map(produto => produto.id)
      },
      order: [['preco', 'DESC']]
    });

    return produtosOrdenados;
  }
  if (ordenacao === 'novidades') {
    const produtosOrdenados = await Produtos.findAll({
      where: {
        id: produtosFiltrados.map(produto => produto.id)
      },
      order: [['createdAt', 'DESC']]
    });

    return produtosOrdenados;
  }else{
  return produtosFiltrados;
  }
}

//lista as areas dos produtos
async function listarAreas(idArea) {
  const areas = await Areas.findByPk(idArea)

  return areas
}

//listar 3 produtos mais acessados
async function produtosMaisAcessados() {
  const acesso = await Visitas.findAll({
    attributes: ['produtos_id', [Sequelize.fn('COUNT', 'produtos_id'), 'visitas']],
    include: [{
      model: Produtos,
      as: 'produtos',
      include: [{
        model: Imagens,
        as: 'imagens',
        attributes: ['caminho']
      }]
    }],
    group: ['produtos_id'],
    order: [[Sequelize.literal('visitas'), 'DESC']],
    limit: 3
  })

  return acesso
}

//listar pedidos entregues
async function produtosDePedidosEntregues(idCliente) {
  const produtos = await Produtos.findAll({
      include: [{
        model: Pedidos,
        as: "pedidos",
        where: {
          clientes_id: idCliente,
          entregueAt: { [Op.not]: null }
        }
    }, {
          model: Imagens,
          as:"imagens",
          attributes: ['caminho']
    }]
  });
  return produtos;
}

//listar pedidos em andamento
async function produtosDePedidosEmAndamento(idCliente) {
  const produtos = await Produtos.findAll({
      include: [{
        model: Pedidos,
        as: "pedidos",
        where: {
          clientes_id: idCliente,
          entregueAt: null
        }
    }, {
          model: Imagens,
          as: "imagens",
          attributes: ['caminho']
    }]
  });
  return produtos;
}

//listar todos os pedidos do cliente
async function produtosDeTodosOsPedidos(idCliente) {
  const produtos = await Produtos.findAll({
      include: [{
        model: Pedidos,
        as: "pedidos",
        where: {
          clientes_id: idCliente
        }
    }, {
          model: Imagens,
          as: "imagens",
          attributes: ['caminho']
    }]
  });
  return produtos;
}

//Pesquisa produtos na busca do header
async function pesquisar(pesquisa) {
  if(pesquisa ==''){
    console.log('nenhuma pesquisa no header')
  }else{
    const produtos = await Produtos.findAll({
    where: {
      nome: {
        [Op.like]: `%${pesquisa}%`
      }}, 
      include: [{
        model: Imagens,
        as: 'imagens',
        attributes: ['caminho']
      }]
  });

  return produtos
  }
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
  listarAreas,
  ordenarProdutos,
  produtosMaisAcessados,
  produtosDePedidosEntregues,
  produtosDePedidosEmAndamento,
  produtosDeTodosOsPedidos,
  pesquisar,
  mostrarProdutoId,
  excluirProdutoId,
  listarProdutosFiltrados
}