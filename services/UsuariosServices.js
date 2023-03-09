const usuarios = require("../databases/Usuarios.json");
const bcrypt = require("bcrypt");
const fs = require('fs');

function buscaUsuario(email) {
  const usuario = usuarios.find((usuario) => usuario.email == email);
  return usuario;
}
function checaSenha(usuario, senha) {
  return bcrypt.compareSync(senha, usuario.senha);
}
function criarUsuario(usuario) {
  // Encontra o último ID dos Usuarios existentes e adiciona 1 para gerar um novo ID
  const ultimoID = usuarios[usuarios.length -1].id
  const id = ultimoID + 1;
  // Adiciona o ID ao objeto de produto
  usuario.id = id;
  // Adiciona o produto ao array de Usuarios
  usuarios.push(usuario);
  // Escreve o array atualizado de Usuarios no arquivo JSON
  fs.writeFileSync('./databases/Usuarios.json', JSON.stringify(usuarios,null,4));
  // Retorna o Usuario  criado
  return usuario;
}

function excluirUsuarioId(id) {
    // Encontrar o índice do usuário a ser excluído pelo ID
    const indiceUsuario = usuarios.findIndex(u => u.id == id);
    if (indiceUsuario !== -1) {
      // Remover o usuário do array de usuários
      usuarios.splice(indiceUsuario, 1);
      // Escrever os dados atualizados no arquivo JSON
      fs.writeFileSync('./databases/Usuarios.json', JSON.stringify(usuarios, null, 4));
      // Retornar true se o usuário foi excluído com sucesso
      return true;
    } else {
      // Retornar false se não encontrar o usuário a ser excluído
      return false;
    }
  }


module.exports = {
  buscaUsuario,
  checaSenha,
  criarUsuario,
  excluirUsuarioId
};
