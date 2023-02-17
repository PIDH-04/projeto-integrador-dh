const categorias = require('../databases/Categorias.json');
const produtos = require('../databases/Produtos.json');

const ProdutosControllers = {
  show: (req, res) => {
    let id = req.params.idDoProduto;
    const produto = produtos.find( p => p.id == id);

    return res.render('produto', {categorias, produto});
  },
  listagem: (req, res) => {
    let link = req.params.link;
    const categoria = categorias.find( c => c.link == link);
    return res.render('listagemProdutos', {categorias, produtos, categoria});
  },
  showCarrinho: (req, res) => {
    return res.render('carrinho', {categorias, produtos});
  },
};

module.exports = ProdutosControllers;
