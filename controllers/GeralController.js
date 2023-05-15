const CategoriasServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');

const GeralController = {
  home: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    const usuarioLogado = req.session.clienteLogado
    //Mostra os 3 produtos mais acessados/visitados
    const destaque = await ProdutosServices.produtosMaisAcessados();
    return res.render('home', { categorias, destaque, usuarioLogado});
  }
};

module.exports = GeralController;