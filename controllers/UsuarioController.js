const categorias = require('../databases/Categorias.json');
const produtos = require('../databases/Produtos.json');

const CadastroController = {
    showCadastro: (req, res) => {
<<<<<<< HEAD
        return res.render('cadastro');


=======
        return res.render('cadastro', {categorias});
>>>>>>> 1c8455a049021c42e709b8cf9bc357a9f380b245
    },
    finalizacaoCompra: (req, res) => {
      return res.render('finalizacaoCompra', {categorias});
    },
    login: (req, res) => {
      return res.render('login');
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
<<<<<<< HEAD

    
    criarCadastro: (req , res) =>{
      return res.render ("criarCadastro");

=======
    showPainelUsuario:(req, res) => {
      return res.render('painelUsuario', {categorias})
    },
    showstatusDePedido:(req, res) => {
      return res.render('statusDePedido', {categorias})
>>>>>>> 1c8455a049021c42e709b8cf9bc357a9f380b245
    }

 
}

module.exports = CadastroController;