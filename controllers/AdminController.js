const { buscaAdmin, checaSenha } = require("../services/AdminServices");

const AdminController = {
  showLogin: (req, res) => {
    res.render("adminLogin");
  },
  login: (req, res) => {
    const { email, senha } = req.body;
    const admin = buscaAdmin(email);

    if (!admin) {
      res.redirect("/admin?error=true");
    }

    const senhaCorreta = checaSenha(admin, senha);

    if (!senhaCorreta) {
      res.redirect("/admin?error=true");
    }

    res.redirect("/admin/pedidos");
  },
  showClientes: (req, res) => {
    res.render("adminClientes");
  },
  showProdutos: (req, res) => {
    res.render("adminProdutos");
  },
  showPedidos: (req, res) => {
    res.render("adminPedidos");
  },
  showCriarProduto: (req, res) => {
    res.render("adminAddProduto");
  },
  showEditarProduto: (req, res) => {
    res.render("adminEditarProduto");
  },
};

module.exports = AdminController;
