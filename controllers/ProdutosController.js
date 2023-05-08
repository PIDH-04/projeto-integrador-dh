const CategoriasServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');
const {Produtos} = require('../databases/models');



const ProdutosControllers = {
  show: async (req, res) => {
     const categorias = await CategoriasServices.listarCategorias();
    let slugProduto = req.params.slugProduto;
    const produto = ProdutosServices.mostrarProdutoSlug(slugProduto);
    console.log(produto);
    //produto.descricao = produto.descricao.replace('\r\n', " <br> ")

    
    

    return res.render('produto', {categorias, produto});
  },
  listagem: async (req, res) => {
     // Mostrar categorias para header e footer
     const categorias = await CategoriasServices.listarCategorias();
    

    //Pegar parametro da url(slug)
    let slugCategoria = req.params.slugCategoria;
    //Alterar a categoria mostrada no banner da pagina
    const categoria = CategoriasServices.mostrarCategoriaSlug(slugCategoria);
    //categoria.descricao = categoria.descricao.replace('\r\n', " <br> ")

    //Pegar parametro da url(area)
    const area = req.params.area;
        //Alterar produtos para aparecer apenas os que constam a categoria do slug e no filtro
    const produtos = ProdutosServices.listarProdutosFiltrados(slugCategoria, area);

    //Retorna view
    return res.render('listagemProdutos', {categorias, produtos, categoria});
  },
  showCarrinho: async (req, res) => {
     // Mostrar categorias para header e footer
     const categorias = await CategoriasServices.listarCategorias();
    

     //Listrar produtos
     const produtos = ProdutosServices.listarProdutos();

    return res.render('carrinho', {categorias, produtos});
  },
};

module.exports = ProdutosControllers;
