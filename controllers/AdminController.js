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
};

module.exports = AdminController;