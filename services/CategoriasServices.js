const {Produtos} = require('../databases/models');
const categorias = require('../databases/Categorias.json');
const fs = require('fs');
const {Categorias} = require('../databases/models');
const { log } = require('console');

//exemplo função crud
async function listarCategorias() {
  let categorias = await Categorias.findAll();
  
 
  return categorias
}

function mostrarCategoriaSlug(slugCategoria) {
  const categoriaEncontrada = categorias.find(categoria => categoria.slug === slugCategoria);
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

function editaCategoria(id, novasInfos){
  const indexCategoria = categorias.findIndex(categoria => categoria.id == id);

  if(indexCategoria == -1){
    return false
  }

  categorias[indexCategoria] = {
    id: categorias[indexCategoria].id,
    slug: categorias[indexCategoria].slug,
    ...novasInfos
  };
  fs.writeFileSync('./databases/Categorias.json', JSON.stringify(categorias,null,4));
  return true
}

function criaCategoria(infosCategoria){
  const id = categorias[categorias.length - 1].id + 1;
  
  const categoria = {
    id,
    ...infosCategoria
  }

  categorias.push(categoria)
  fs.writeFileSync('./databases/Categorias.json', JSON.stringify(categorias,null,4));

  return categoria
}

function deletaCategoria(id){
  const indexCategoria = categorias.findIndex(categoria => categoria.id == id)
   if (indexCategoria !== -1) {
    categorias.splice(indexCategoria, 1);
    fs.writeFileSync('./databases/Categorias.json', JSON.stringify(categorias, null, 4));
    return true;
  } else {
    return false;
  }
}

module.exports = {
  listarCategorias,
  mostrarCategoriaSlug,
  mostrarCategoriaId,
  editaCategoria,
  criaCategoria,
  deletaCategoria
}
