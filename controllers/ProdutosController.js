const ProdutosControllers = {
  show: (req, res) => {
    return res.render("produto");
  },
  listagem: (req, res) => {
    return res.render("listagemProdutos");
  },
  showCarrinho: (req, res) => {
    return res.render("carrinho");
  },
};

module.exports = ProdutosControllers;
