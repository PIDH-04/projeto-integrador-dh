const CategoriasServices = require('../databases/Categorias.json');
const fs = require('fs');

function listarCategorias() {
  return CategoriasServices;

}

function mostrarCategoriasd(id) {
  const categoriaEncontrada = CategoriasServices.find(categoria => categoria.id === id);

  if (categoriaEncontrada) {
    return categoriaEncontrada;
  } else {
    return null;
  }
}

module.exports = {
  listarCategorias,
  mostrarCategoriasd,
}
