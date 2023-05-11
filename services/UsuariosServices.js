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

function listarUsuarios(){
  const usuariosFormatados = []
  
  for(let usuario of usuarios){
    usuariosFormatados.push({
      nome: usuario.nome,
      email: usuario.email,
      id: usuario.id
    })
  }

  return usuariosFormatados;
}


module.exports = {
  buscaUsuario,
  checaSenha,
  criarUsuario,
  listarUsuarios
};
