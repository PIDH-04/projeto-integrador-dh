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

    const senhaCorreta = ClientesServices.checaSenha(cliente, senha)

    if (!senhaCorreta) return res.redirect(`/cadastro?${queryParamsErro}`)

    req.session.clienteLogado = true
    req.session.cliente = {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email
    }
    

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
    const idUsuario = req.session.cliente.id
    const categorias = await CategoriasServices.listarCategorias();
    const enderecos = await ClientesServices.listaEnderecos(idUsuario)    //pesquisa header
    const pesquisa = req.query.busca
    //Mostrar produtos e categorias de resposta da pesquisa
    const pesquisados = await ProdutosServices.pesquisar(pesquisa);

    return res.render('checkoutEndereco', { categorias, enderecos, pesquisados });
  },

  checkoutPagamento: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    const enderecoSelecionado = req.params.idEndereco
    const frete = 0    //pesquisa header
    const pesquisa = req.query.busca
    //Mostrar produtos e categorias de resposta da pesquisa
    const pesquisados = await ProdutosServices.pesquisar(pesquisa);

    return res.render('checkoutPagamento', { categorias, pagamento: {cartao: 1}, endereco: enderecoSelecionado, frete, pesquisados });
  },
  showPainelUsuario: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //pega id da url
    const idCliente = req.params.idCliente
    //Mostrar produtos e categorias de resposta da pesquisa
    const pesquisados = await ProdutosServices.pesquisar(pesquisa);
    const cliente = req.session.cliente

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
    const cliente = req.session.cliente
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
  },
  criaEndereco: async (req, res) => {
    try{
      const idUsuario = req.session.cliente.id
      const novoEndereco = await ClientesServices.adicionaEndereco(idUsuario, req.body)
      console.log(novoEndereco)

      return res.redirect(`/checkoutpagamento/${novoEndereco.id}`);

    }catch(e){
      console.log(e)
      return res.redirect('/')
    }
  }
}

module.exports = CadastroController;