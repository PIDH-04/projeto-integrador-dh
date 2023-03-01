const categorias = require('../databases/Categorias.json');

function categoriaId(id) {
  const categoriaEncontrada = categorias.find(categoria => categoria.id === id);
  
  if (categoriaEncontrada) {
    return categoriaEncontrada;
  } else {
    return null;
  }
}

// Testa a função 
console.log(categoriaId("1"));