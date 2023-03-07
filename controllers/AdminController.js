const { buscaAdmin } = require("../services/AdminServices");
const { listarProdutos } = require("../services/ProdutosServices");
const { checaSenha } = require("../services/UsuariosServices");

const AdminController = {
  showLogin: (req, res) => {
    if (req.session.adminLogado == true) {
      return res.redirect("/admin/pedidos");
    } else {
      const target = req.query.target;
      const erro = req.query.erro;
      return res.render("adminLogin", { target: target, erro: erro });
    }
  },
  login: (req, res) => {
    const { email, senha, target } = req.body;
    const admin = buscaAdmin(email);
    const queryParamsErro = target ? `target=${target}&erro=true` : 'erro=true'

    if (!admin) {

      return res.redirect(`/admin?${queryParamsErro}`);
    }

    const senhaCorreta = checaSenha(admin, senha);

    if (!senhaCorreta) {
      return res.redirect(`/admin?${queryParamsErro}`);
    }

    req.session.adminLogado = true;
    const enderecoSolicitado = target ? target : "/admin/pedidos";
    res.redirect(enderecoSolicitado);
  },
  showClientes: (req, res) => {
    res.render("adminClientes");
  },
  showProdutos: (req, res) => {

    const produtos = listarProdutos();
    console.log(produtos)
    res.render("adminProdutos", { produtos });
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
