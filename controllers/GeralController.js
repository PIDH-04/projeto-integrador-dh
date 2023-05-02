const CategoriasServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');
const {Produtos} = require('../databases/models');

const GeralController = {
    home: async (req, res) => {
      // Mostrar categorias para header e footer
      const categorias = await CategoriasServices.listarCategorias();
      
        return res.render('home', {categorias});
      }

      



};

module.exports = GeralController;