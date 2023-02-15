const AdminController = {
  showLogin: (req, res) => {
    res.render("adminLogin");
  },
  showClientes: (req, res) => {
    res.render("adminClientes")
  },
};

module.exports = AdminController;
