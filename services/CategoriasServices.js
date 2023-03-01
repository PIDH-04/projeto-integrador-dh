const CategoriasServices = require('../databases/Categorias.json');

function listarCategorias() {
    return CategoriasServices;

}

function categoriaId(id) {
    const categoriaEncontrada = categorias.find(categoria => categoria.id === id);
    
    if (categoriaEncontrada) {
      return categoriaEncontrada;
    } else {
      return null;
    }
  }
  
module.exports = {
    listarCategorias,
    getCategoriaById: categoriaId
}