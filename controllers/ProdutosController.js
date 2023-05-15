const CategoriasServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');

const ProdutosControllers = {
  show: async (req, res) => {
    //Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //Pegar na url o id do produto acessado
    let idProduto = req.params.idProduto;
    //Mostrar produto do id da url
    const produto = await ProdutosServices.mostrarProdutoId(idProduto);
    //produto.descricao = produto.descricao.replace('\r\n', " <br> ")

    return res.render('produto', { categorias, produto });
  },
  listagem: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //Pegar parametro da url(idCategoria)
    let idCategoria = req.params.idCategoria;
    //Alterar a categoria mostrada no banner da pagina
    const categoria = await CategoriasServices.mostrarCategoriaId(idCategoria);
    //categoria.descricao = categoria.descricao.replace('\r\n', " <br> ")

    //Pegar parametro da url(idArea)
    const idArea = req.params.idArea;
    //Pegar parametro da url(ordenacao)
    /* const ordenacao = req.params.ordenacao; */

    /* const area = await ProdutosServices.listarAreas(idArea); */
    //Alterar produtos para aparecer apenas os que constam a categoria e area indicada na url
    const produtos = await ProdutosServices.listarProdutosFiltrados(idCategoria, idArea/* , ordenacao */);

    return res.render('listagemProdutos', { categorias, produtos, categoria/* , area  */ });
  },
  showCarrinho: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //Listrar produtos
    const produtos = await ProdutosServices.listarProdutos();

    return res.render('carrinho', { categorias, produtos });
  },
  showBusca: async (req, res) => {
    // Mostrar categorias para header e footer
    const categorias = await CategoriasServices.listarCategorias();
    //pesquisa header
    const pesquisa = req.query.busca
    //Mostrar produtos e categorias de resposta da pesquisa
    const produtos = await ProdutosServices.pesquisar(pesquisa);

    return res.render('buscaHeader', { categorias, produtos });
  }
};

module.exports = ProdutosControllers;