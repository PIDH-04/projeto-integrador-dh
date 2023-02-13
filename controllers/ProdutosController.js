const path = require("path");

const ProdutosControllers = {
    show: (req, res) => {
        return res.render("produto");
      },
      listagem: (req, res) => {
        return res.render("listagemProdutos");
      }
}

module.exports = ProdutosControllers;