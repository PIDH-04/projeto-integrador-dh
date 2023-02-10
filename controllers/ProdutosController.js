const path = require("path");

const ProdutosControllers = {
    show: (req, res) => {
        return res.render("produto");
      }
}

module.exports = ProdutosControllers;