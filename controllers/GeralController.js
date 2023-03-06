const CategoriasServices = require('../services/CategoriasServices');
const ProdutosServices = require('../services/ProdutosServices');

const GeralController = {
    home: (req, res) => {
      // Mostrar categorias para header
      const categorias = CategoriasServices.listarCategorias();
      
        return res.render('home', {categorias});
      }

      



};

module.exports = GeralController;