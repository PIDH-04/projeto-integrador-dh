const categorias = require('../databases/Categorias.json');
const produtos = require('../databases/Produtos.json');

const GeralController = {
    home: (req, res) => {
        return res.render('home', {categorias, produtos});
      }
};

module.exports = GeralController;