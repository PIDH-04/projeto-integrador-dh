const categorias = require('../databases/Categorias.json');
const produtos = require('../databases/Produtos.json');

const CadastroController = {
    showCadastro: (req, res) => {
        return res.render('cadastro');


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

    
    criarCadastro: (req , res) =>{
      return res.render ("criarCadastro");

    }

 
}

module.exports = CadastroController;