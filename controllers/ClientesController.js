const CategoriasServices = require('../services/CategoriasServices');
const ClientesServices = require('../services/ClientesServices');
const ProdutosServices = require('../services/ProdutosServices');

const CadastroController = {
  showCadastro: async (req, res) => {
    const { target, erro } = req.query
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();

    return res.render('cadastro', { categorias, target, erro });
  },
  finalizacaoCompra: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();

    return res.render('finalizacaoCompra', { categorias });
  },
  showLogin: (req, res) => {
    return res.render('login');
  },
  login: async (req, res) => {
    const { email, senha, target } = req.body
    const cliente = await ClientesServices.buscaCliente(email)
    const queryParamsErro = target ? `target=${target}&erro=true` : 'erro=true'


    if (!cliente) return res.redirect(`/cadastro?${queryParamsErro}`)
    console.log(cliente);

    const senhaCorreta = ClientesServices.checaSenha(cliente, senha)

    if (!senhaCorreta) return res.redirect(`/cadastro?${queryParamsErro}`)

    req.session.clienteLogado = true

    const enderecoSolicitado = target ? target : '/'
    res.redirect(enderecoSolicitado)

  },
  logout: (req, res) => {
    req.session.destroy()
    res.redirect('/admin')
  },
  loginEmail: (req, res) => {
    return res.render('loginEmail');
  },
  checkoutEndereco: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();

    return res.render('checkoutEndereco', { categorias });
  },
  checkoutPagamento: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();

    return res.render('checkoutPagamento', { categorias });
  },
  showPainelUsuario: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();

    return res.render('painelUsuario', { categorias })
  },
  showstatusDePedido: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();

    return res.render('statusDePedido', { categorias })
  },
  criarCadastro: async (req, res) => {
    const cliente = {
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha
    }
    await ClientesServices.criarCliente(cliente);

    return res.redirect("/cadastro?msg=facaOLogin");
  }
}

module.exports = CadastroController;