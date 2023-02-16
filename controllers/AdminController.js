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
  }
};

module.exports = AdminController;
