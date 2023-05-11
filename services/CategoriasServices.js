const fs = require('fs');
const { Categorias } = require('../databases/models');

//lista todas as categorias
async function listarCategorias() {
  let categorias = await Categorias.findAll();
  return categorias
}

//mostrar categoria de id especifico
async function mostrarCategoriaId(idCategoria) {
  const categoriaEncontrada = await Categorias.findByPk(idCategoria);

  if (categoriaEncontrada == undefined) {
    return await Categorias.findOne({
      where: { id: 1 }
    })
  }
  return categoriaEncontrada;
}

//criar categoria
async function criaCategoria(infosCategoria) {
  let categoriaNova = await Categorias.create(infosCategoria);
}

//deleta categoria
async function deletaCategoria(idCategoria) {

  let categoriaParaRemover = await Categorias.destroy({ where: { id: idCategoria } });

  if (categoriaParaRemover == 0) {
    throw new Error("Categoria inexistente");
  }

}

//edita categoria
async function editaCategoria(idCategoria, novasInfos) {

  //acha a categoria a ser editada pelo id
  const categoria = await Categorias.findByPk(idCategoria);

  //da error se o id da categoria não corresponder a nenhum
  if (categoria === undefined) {
    throw new Error("Categoria inexistente");
  };

  await categoria.update(novasInfos);

}

module.exports = {
  listarCategorias,
  mostrarCategoriaId,
  editaCategoria,
  criaCategoria,
  deletaCategoria
}
