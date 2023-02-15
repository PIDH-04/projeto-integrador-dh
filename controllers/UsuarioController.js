const CadastroController = {
    showCadastro: (req, res) => {
        return res.render('cadastro');


    },
    finalizacaoCompra: (req, res) => {
      return res.render("finalizacaoCompra");
    },
    login: (req, res) => {
      return res.render("login");
    },
    loginEmail: (req, res) => {
      return res.render("loginEmail");
    },
    checkoutEndereco: (req, res) => {
      return res.render("checkoutEndereco");
    },
    checkoutPagamento: (req, res) => {
      return res.render("checkoutPagamento");
    },

    
    criarCadastro: (req , res) =>{
      return res.render ("criarCadastro");

    }

 
}

module.exports = CadastroController;