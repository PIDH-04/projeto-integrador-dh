const categorias = require('../databases/Categorias.json');
const produtos = require('../databases/Produtos.json');

const CadastroController = {
    showCadastro: (req, res) => {
<<<<<<< HEAD
        return res.render('cadastro');


=======
        return res.render('cadastro', {categorias});
>>>>>>> c57b1b74b76b8d89d4d6597eea02701f0920a294
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

    }
=======
    showPainelUsuario:(req, res) => {
      return res.render('painelUsuario', {categorias})
    },
    showstatusDePedido:(req, res) => {
      return res.render('statusDePedido', {categorias})
>>>>>>> c57b1b74b76b8d89d4d6597eea02701f0920a294

    criarCadastro: (req , res) =>{
      return res.render ("criarCadastro");

    }
}
}

module.exports = CadastroController;