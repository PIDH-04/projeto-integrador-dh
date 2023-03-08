const fs = require('fs');
const UsuariosSite = require('../databases/Usuarios.json');


function excluirUsuarios(id) {
    // Encontrar o índice do produto a ser excluído pelo ID
    const indiceUsuario = UsuariosSite.findIndex(p => p.id === id);
  
    if (indiceProduto !== -1) {
        // Remover o produto do array de produtos
        UsuariosSite.splice(indiceUsuario, 1);
  
        // Escrever os dados atualizados no arquivo JSON
        fs.writeFileSync('./databases/Usuarios.json', JSON.stringify(UsuariosSite,null,4));
  
        // Retornar true se o produto foi excluído com sucesso
        return true;
    } else {
        // Retornar false se não encontrar o produto a ser excluído
        return false;
    }
  }

  excluirUsuarios(3);




