const path = require("path");

const GeralController = {
    home: (req, res) => {
        return res.render("home");
      },
      finalizacaoCompra: (req, res) => {
        return res.render("finalizacaoCompra");
      },
      carrinho: (req, res) => {
        return res.render("carrinho");
      },
      login: (req, res) => {
        return res.render("login");
      },
      loginEmail: (req, res) => {
        return res.render("loginEmail");
      },
      checkoutEndereco: (req, res) => {
        return res.render("checkoutEndereco");
      },
      checkoutPagamento: (req, res) => {
        return res.render("checkoutPagamento");
      }
};

module.exports = GeralController;