const {clientes} =require('../databases/models');
const CategoriasServices = require('../services/CategoriasServices');
const UsuariosServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');
const { buscaUsuario, checaSenha , criarUsuario , } = require('../services/ClientesServices');




const CadastroController = {
    showCadastro: async (req, res) => {
      
        const {target, erro} = req.query
      // Mostrar categorias para header e footer
     const categorias = await CategoriasServices.listarCategorias();
     
     
        return res.render('cadastro', {categorias, target, erro});
    },
    finalizacaoCompra: (req, res) => {
      // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

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
      // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

      return res.render('checkoutEndereco', {categorias});
    },
    checkoutPagamento: (req, res) => {
      // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

      return res.render('checkoutPagamento', {categorias});
    },
    showPainelUsuario:(req, res) => {
      // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

      return res.render('painelUsuario', {categorias})
    },
    showstatusDePedido:(req, res) => {
      // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

      return res.render('statusDePedido', {categorias})
    },
    criarCadastro: async (req , res) =>{
      const usuario = {
        nome:req.body.nome,
        email:req.body.email,
        senha:req.body.senha

      }
console.log(usuario);

      await UsuariosServices.criarUsuario(usuario);
      return res.redirect("/cadastro?msg=facaOLogin");

    }
}

module.exports = CadastroController;