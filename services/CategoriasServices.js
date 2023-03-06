const categorias = require('../databases/Categorias.json');
const fs = require('fs');

function listarCategorias() {
  return categorias;

}

function mostrarCategoria(id) {
  const categoriaEncontrada = categorias.find(categoria => categoria.id === id);
  const categoriaNeutra = categorias[0];

  if (categoriaEncontrada) {
    return categoriaEncontrada;
  } else {
    return categoriaNeutra;
  }
}

module.exports = {
  listarCategorias,
  mostrarCategoria,
}
