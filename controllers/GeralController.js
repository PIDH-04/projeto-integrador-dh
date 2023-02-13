const path = require("path");

const GeralController = {
    home: (req, res) => {
        return res.render("home");
      },
      master: (req, res) => {
        return res.render("master");
      },
      header: (req, res) => {
        return res.render("header");
      },
      finalizacaoCompra: (req, res) => {
        return res.render("finalizacaoCompra");
      },
      carrinho: (req, res) => {
        return res.render("carrinho");
      },
      login: (req, res) => {
        return res.render("login")
      }
};

module.exports = GeralController;