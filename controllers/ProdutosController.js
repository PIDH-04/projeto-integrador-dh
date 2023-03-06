const CategoriasServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');

const ProdutosControllers = {
  show: (req, res) => {
     // Mostrar categorias para header
     const categorias = CategoriasServices.listarCategorias();

    let id = req.params.idDoProduto;
    const produto = produtos.find( p => p.id == id);

    return res.render('produto', {categorias, produto});
  },
  listagem: (req, res) => {
     // Mostrar categorias para header
     const categorias = CategoriasServices.listarCategorias();

    //Listar produtos
    const produtos = ProdutosServices.listarProdutos();

    //Pegar parametro da url e alterar a categoria mostrada
    let id = req.params.id;
    const categoria = CategoriasServices.mostrarCategoria(id);

    //Retorna view
    return res.render('listagemProdutos', {categorias, produtos, categoria});
  },
  showCarrinho: (req, res) => {
     // Mostrar categorias para header
     const categorias = CategoriasServices.listarCategorias();
     
    return res.render('carrinho', {categorias, produtos});
  },
};

module.exports = ProdutosControllers;
