const categorias = require('../databases/Categorias.json');
const fs = require('fs');

function listarCategorias() {
  return categorias;

}

function mostrarCategoriasd(id) {
  const categoriaEncontrada = categorias.find(categoria => categoria.id == id);

  if (categoriaEncontrada) {
    return categoriaEncontrada;
  } else {
    return null;
  }
}

function editaCategoria(id, novasInfos){
  const indexCategoria = categorias.findIndex(categoria => categoria.id == id);

  if(indexCategoria == -1){
    return false
  }

  categorias[indexCategoria] = {
    id: categorias[indexCategoria].id,
    ...novasInfos
  };
  fs.writeFileSync('./databases/Categorias.json', JSON.stringify(categorias,null,4));
  return true
}

module.exports = {
  listarCategorias,
  mostrarCategoriasd,
  editaCategoria
}
