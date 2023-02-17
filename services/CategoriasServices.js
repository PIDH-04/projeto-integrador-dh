const categorias = require('../databases/Categorias.json');


function listarCategorias() {
    return categorias;

}

function getCategoriaById(id) {
    const categoria = categorias.find(c => c.id === id);
    if (categoria) {
        return categoria;
    } else {
        return null;
    }

}

module.exports = {
    listarCategorias,
    getCategoriaById
}