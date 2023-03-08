const categorias = require('../databases/Categorias.json');
const produtos = require('../databases/Produtos.json');
const { buscaUsuario, checaSenha } = require('../services/UsuariosServices');

const CadastroController = {
    showCadastro: (req, res) => {
        const {target, erro} = req.query
        return res.render('cadastro', {categorias, target, erro});
    },
    finalizacaoCompra: (req, res) => {
      return res.render('finalizacaoCompra', {categorias});
    },
    showLogin: (req, res) => {
      return res.render('login');
    },
    login: (req, res) => {
      const {email, senha, target} = req.body
      const usuario = buscaUsuario(email)
      const queryParamsErro = target ? `target=${target}&erro=true` : 'erro=true'


      if(!usuario) return res.redirect(`/cadastro?${queryParamsErro}`)

      const senhaCorreta = checaSenha(usuario, senha)
      
      if(!senhaCorreta) return res.redirect(`/cadastro?${queryParamsErro}`)

      req.session.usuarioLogado = true

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
    checkoutEndereco: (req, res) => {
      return res.render('checkoutEndereco', {categorias});
    },
    checkoutPagamento: (req, res) => {
      return res.render('checkoutPagamento', {categorias});
    },
    showPainelUsuario:(req, res) => {
      return res.render('painelUsuario', {categorias})
    },
    showstatusDePedido:(req, res) => {
      return res.render('statusDePedido', {categorias})
    },
    criarCadastro: (req , res) =>{
      return res.render ("criarCadastro");

    }
}

module.exports = CadastroController;