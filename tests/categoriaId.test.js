const CategoriasServices = require('../databases/Categorias.json');
const fs = require('fs');

function categoriaId(id) {
  
  const categoriaEncontrada = CategoriasServices.categorias.find(categoria => categoria.id === id);
  
  if (categoriaEncontrada) {
   
    return categoriaEncontrada;
  } else {
    
    return null;
  }
}



// Testa a função 
console.log(categoriaId(1));
