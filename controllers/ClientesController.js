const CategoriasServices = require('../services/CategoriasServices');
const ClientesServices = require('../services/ClientesServices');
const { listarPedidosDeUsuarioComProdutos } = require('../services/PedidosServices');
const ProdutosServices = require('../services/ProdutosServices');
const bcrypt = require('bcrypt')

const CadastroController = {
  showCadastro: async (req, res) => {
    const { target, erro } = req.query
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const usuarioLogado = req.session.clienteLogado

    const pesquisa = req.query.busca

    return res.render('cadastro', { categorias, target, erro, usuarioLogado });
  },
  finalizacaoCompra: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    const usuarioLogado = req.session.clienteLogado

    return res.render('finalizacaoCompra', { categorias, usuarioLogado });
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
  logoutCliente: (req, res) => {
    req.session.destroy()
    res.redirect('/cadastro')
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
    const usuarioLogado = req.session.clienteLogado
    

    return res.render('checkoutEndereco', { categorias, enderecos, usuarioLogado });
  },

  checkoutPagamento: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    const enderecoSelecionado = req.params.idEndereco
    const frete = 0    //pesquisa header
    const pesquisa = req.query.busca
    const usuarioLogado = req.session.clienteLogado


    return res.render('checkoutPagamento', { categorias, pagamento: {cartao: 1}, endereco: enderecoSelecionado, frete, usuarioLogado });
  },
  showPainelUsuario: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //pega id da url
    const idCliente = req.params.idCliente
    const cliente = req.session.cliente
    const feedbackAtualizacao = req.query.atualizado
    const usuarioLogado = req.session.clienteLogado

    return res.render('painelUsuario', { categorias, cliente, feedbackAtualizacao, usuarioLogado })
  },
  showstatusDePedido: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    // Pegando paramentro da url(idCliente)
    const idCliente = req.params.idCliente;
    const cliente = req.session.cliente
    const pedidos = await listarPedidosDeUsuarioComProdutos(idCliente);
    const usuarioLogado = req.session.clienteLogado

    return res.render('statusDePedido', { categorias, pedidos, cliente: cliente.nome, usuarioLogado  })
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
  },
  atualizaCliente: async (req, res) => {
    const { idCliente } = req.params
    const { nome, senha } = req.body
    try{

      if(!senha){
        await ClientesServices.editarCliente(idCliente, {nome} )
      }else{
        const senhaCriptografada = bcrypt.hashSync(senha, 8)
        await ClientesServices.editarCliente(idCliente, {nome, senha: senhaCriptografada} )
      }

      req.session.cliente.nome = nome
      return res.redirect('/painelUsuario?atualizado=true')

    }catch(e){
      console.log(e)
      return res.redirect('/painelUsuario?atualizado=false')
    }
  }
}

module.exports = CadastroController;