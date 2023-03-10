const CategoriasServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');

const ProdutosControllers = {
  show: (req, res) => {
     // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

    let slugProduto = req.params.slugProduto;
    const produto = ProdutosServices.mostrarProdutoSlug(slugProduto);
    produto.descricao = produto.descricao.replace('\r\n', " <br> ")


    return res.render('produto', {categorias, produto});
  },
  listagem: (req, res) => {
     // Mostrar categorias para header e footer
     const categorias = CategoriasServices.listarCategorias();

    //Pegar parametro da url(slug)
    let slugCategoria = req.params.slugCategoria;
    
    //Alterar a categoria mostrada no banner da pagina
    const categoria = CategoriasServices.mostrarCategoriaSlug(slugCategoria);
    categoria.descricao = categoria.descricao.replace('\r\n', " <br> ")

    //Alterar produtos para aparecer apenas os que constam a categoria do slug
    const produtos = ProdutosServices.listarProdutosCategoriaSlug(slugCategoria);
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
