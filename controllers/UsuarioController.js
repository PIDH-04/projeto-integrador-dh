const CategoriasServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');

const CadastroController = {
    showCadastro: (req, res) => {
      // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();
     
        return res.render('cadastro', {categorias});
    },
    finalizacaoCompra: (req, res) => {
      // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

      return res.render('finalizacaoCompra', {categorias});
    },
    login: (req, res) => {
      return res.render('login');
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

    criarCadastro: (req , res) =>{
      return res.render ("criarCadastro");

    }
}
}

module.exports = CadastroController;