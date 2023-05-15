const CategoriasServices = require('../services/CategoriasServices');
const ClientesServices = require('../services/ClientesServices');
const ProdutosServices = require('../services/ProdutosServices');

const CadastroController = {
  showCadastro: async (req, res) => {
    const { target, erro } = req.query
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //Mostrar produtos e categorias de resposta da pesquisa
    const pesquisados = await ProdutosServices.pesquisar(pesquisa);

    return res.render('cadastro', { categorias, target, erro, pesquisados });
  },
  finalizacaoCompra: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //Mostrar produtos e categorias de resposta da pesquisa
    const pesquisados = await ProdutosServices.pesquisar(pesquisa);

    return res.render('finalizacaoCompra', { categorias, pesquisados });
  },
  showLogin: (req, res) => {
    return res.render('login');
  },
  login: async (req, res) => {
    const { email, senha, target } = req.body
    const cliente = await ClientesServices.buscaCliente(email)
    const queryParamsErro = target ? `target=${target}&erro=true` : 'erro=true'


    if (!cliente) return res.redirect(`/cadastro?${queryParamsErro}`)

    const senhaCorreta = await ClientesServices.checaSenha(cliente, senha)

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
    //pesquisa header
    const pesquisa = req.query.busca
    //Mostrar produtos e categorias de resposta da pesquisa
    const pesquisados = await ProdutosServices.pesquisar(pesquisa);

    return res.render('checkoutEndereco', { categorias, pesquisados });
  },
  checkoutPagamento: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //Mostrar produtos e categorias de resposta da pesquisa
    const pesquisados = await ProdutosServices.pesquisar(pesquisa);

    return res.render('checkoutPagamento', { categorias, pesquisados });
  },
  showPainelUsuario: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //pega id da url
    const idCliente = req.params.idCliente
    //Pega cliente por id
    const cliente = ClientesServices.buscaClienteId(idCliente);
    //Mostrar produtos e categorias de resposta da pesquisa
    const pesquisados = await ProdutosServices.pesquisar(pesquisa);

    return res.render('painelUsuario', { categorias, pesquisados, cliente })
  },
  showstatusDePedido: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //Mostrar produtos e categorias de resposta da pesquisa
    const pesquisados = await ProdutosServices.pesquisar(pesquisa);
    // Pegando paramentro da url(idCliente)
    const idCliente = req.params.idCliente;
    // Mostra cliente
    const cliente = await ClientesServices.buscaClienteId(idCliente);
    // Mostra pedidos entregues
    const entregues = await ProdutosServices.produtosDePedidosEntregues(idCliente);
    // Mostra todos os pedidos
    const todos = await ProdutosServices.produtosDeTodosOsPedidos(idCliente);
    // Mostra os pedidos em andamento
    const andamento = await ProdutosServices.produtosDePedidosEmAndamento(idCliente);

    return res.render('statusDePedido', { categorias, cliente, entregues, todos, andamento, pesquisados })
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