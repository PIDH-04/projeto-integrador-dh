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
    const idCategoria = req.params.idCategoria;
    //Alterar a categoria mostrada no banner da pagina
    const categoria = CategoriasServices.mostrarCategoriaId(idCategoria);
    //categoria.descricao = categoria.descricao.replace('\r\n', " <br> ")

    //Pegar parametro da url(area)
    const idArea = req.params.idArea;
        //Alterar produtos para aparecer apenas os que constam a categoria e na area
    const produtos = ProdutosServices.listarProdutosFiltrados(idCategoria, idArea);

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
