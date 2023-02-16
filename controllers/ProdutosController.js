const categorias = require('../databases/Categorias.json');
const produtos = require('../databases/Produtos.json');

const ProdutosControllers = {
  show: (req, res) => {
    return res.render('produto', {categorias, produtos});
  },
  listagem: (req, res) => {
    return res.render('listagemProdutos', {categorias, produtos});
  },
  showCarrinho: (req, res) => {
    return res.render('carrinho', {categorias, produtos});
  },
};

module.exports = ProdutosControllers;
