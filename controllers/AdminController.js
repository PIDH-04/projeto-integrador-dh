const AdminController = {
  showLogin: (req, res) => {
    res.render("adminLogin");
  },
  showClientes: (req, res) => {
    res.render("adminClientes");
  },
  showProdutos: (req, res) => {
    res.render("adminProdutos")
  },
  showPedidos: (req, res) => {
    res.render("adminPedidos")
  },
  showCriarProduto: (req, res) => {
    res.render("adminAddProduto");
  }
};

module.exports = AdminController;
