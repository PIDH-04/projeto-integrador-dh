const { buscaAdmin } = require("../services/AdminServices");
const { listarCategorias } = require("../services/CategoriasServices");
const {
  listarProdutos,
  excluirProdutoId,
  mostrarProdutoId,
  editarProduto,
} = require("../services/ProdutosServices");
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
    const queryParamsErro = target ? `target=${target}&erro=true` : "erro=true";

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
    res.render("adminProdutos", { produtos });
  },
  showPedidos: (req, res) => {
    res.render("adminPedidos");
  },
  showCriarProduto: (req, res) => {
    res.render("adminAddProduto");
  },
  showEditarProduto: (req, res) => {
    const { id } = req.params;
    const categorias = listarCategorias()
    const produto = mostrarProdutoId(id);
    res.render("adminEditarProduto", {produto, categorias});
  },
  editarProduto: (req, res) => {
    const { id } = req.params
    const produto = req.body
    produto.img = ["/img/mesa-dora.png",
    "/img/mesa.jpg"]
    produto.preco = parseInt(produto.preco)
    const produtoAtualizado = editarProduto(id, req.body)
    
    if(!produtoAtualizado){
     return res.redirect(`/admin/produtos/${id}/editar?salvo=false`)
    }

    return res.redirect(`/admin/produtos/${id}/editar?salvo=true`)
  },
  removeProduto: (req, res) => {
    const { id } = req.params;
    excluirProdutoId(id);
    return res.redirect("/admin/produtos");
  },
};

module.exports = AdminController;
