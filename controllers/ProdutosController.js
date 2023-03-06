const CategoriasServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');

const ProdutosControllers = {
  show: (req, res) => {
     // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

    let slugProduto = req.params.slugProduto;
    const produto = ProdutosServices.mostrarProdutoSlug(slugProduto);

    return res.render('produto', {categorias, produto});
  },
  listagem: (req, res) => {
     // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

    //Listar produtos
    const produtos = ProdutosServices.listarProdutos();

    //Pegar parametro da url e alterar a categoria mostrada
    let slugCategoria = req.params.slugCategoria;
    const categoria = CategoriasServices.mostrarCategoriaSlug(slugCategoria);

    //Retorna view
    return res.render('listagemProdutos', {categorias, produtos, categoria});
  },
  showCarrinho: (req, res) => {
     // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

     //Listrar produtos
     const produtos = ProdutosServices.listarProdutos();

    return res.render('carrinho', {categorias, produtos});
  },
};

module.exports = ProdutosControllers;
