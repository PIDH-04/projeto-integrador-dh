const UsuariosSite = require ("../databases/Usuarios.json")
const fs = require('fs');


function criarUsuario(usuario) {

    // Encontra o último ID dos Usuarios existentes e adiciona 1 para gerar um novo ID
    const ultimoID = UsuariosSite[UsuariosSite.length -1].id
    const id = ultimoID + 1;
  
  
    // Adiciona o ID ao objeto de produto
    usuario.id = id;
  
    // Adiciona o produto ao array de Usuarios
    UsuariosSite.push(usuario);
  
    // Escreve o array atualizado de Usuarios no arquivo JSON
    fs.writeFileSync('./databases/Usuarios.json', JSON.stringify(UsuariosSite,null,4));
  
    // Retorna o Usuario  criado
    return usuario;
  }


  function excluirProdutoId(id) {
    // Encontrar o índice do produto a ser excluído pelo ID
    const indiceProduto = produtosSite.findIndex(p => p.id === id);
  
    if (indiceProduto !== -1) {
        // Remover o produto do array de produtos
        produtosSite.splice(indiceProduto, 1);
  
        // Escrever os dados atualizados no arquivo JSON
        fs.writeFileSync('./databases/Produtos.json', JSON.stringify(produtosSite,null,4));
  
        // Retornar true se o produto foi excluído com sucesso
        return true;
    } else {
        // Retornar false se não encontrar o produto a ser excluído
        return false;
    }
  }



  
module.exports = {

    criarUsuario,

} 
