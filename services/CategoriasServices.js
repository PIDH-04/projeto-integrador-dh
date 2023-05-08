const fs = require('fs');
const {Categorias} = require('../databases/models');

//lista todas as categorias
async function listarCategorias() {
  let categorias = await Categorias.findAll();
  return categorias
}

//mostrar categoria de id especifico
async function mostrarCategoriaId(idCategoria) {
  const categoriaEncontrada = Categorias.findByPk(idCategoria);

  if (categoriaEncontrada == undefined){
    return Categorias.findByPk({
      where:{id:1}
    })
}
return categoriaEncontrada;
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
