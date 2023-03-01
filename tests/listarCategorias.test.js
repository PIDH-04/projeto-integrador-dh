const CategoriasServices = require('../databases/Categorias.json');


function listarCategorias() {
    return CategoriasServices;

}

const resultado = listarCategorias(CategoriasServices);
console.log(resultado);




