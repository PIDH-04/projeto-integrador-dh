const categorias = require('../databases/Categorias.json');
const fs = require('fs');

function listarCategorias() {
  return categorias;

}

function mostrarCategoriaSlug(slug) {
  const categoriaEncontrada = categorias.find(categoria => categoria.slug === slug);
  const categoriaNeutra = categorias[0];

  if (categoriaEncontrada) {
    return categoriaEncontrada;
  } else {
    return categoriaNeutra;
  }
}

function mostrarCategoriaId(id) {
  const categoriaEncontrada = categorias.find(categoria => categoria.id === id);

  if (categoriaEncontrada) {
    return categoriaEncontrada;
  } else {
    return null;
  }
}

module.exports = {
  listarCategorias,
  mostrarCategoriaSlug,
  mostrarCategoriaId
}
