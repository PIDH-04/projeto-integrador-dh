const usuarios = require("../databases/Usuarios.json");
const bcrypt = require("bcrypt");
const {clientes} =require('../databases/models');

const { error } = require("console");
const fs = require('fs');
const path = require('path');

function buscaUsuario(email) {
  const usuario = usuarios.find((usuario) => usuario.email == email);
  return usuario;
}
function checaSenha(usuario, senha) {
  return bcrypt.compareSync(senha, usuario.senha);
}

function editarUsuario (idUsuario , usuarios){
  const editUsuario = usuarios.find((usuario)=> usuario.id == idUsuario);
  if(editUsuario == undefined){
    return error("Usuario não existente");
  }
  editUsuario.nome = usuarios.nome;
  editUsuario.email = usuarios.email;
  editUsuario.senha = usuarios.senha;
  editUsuario.endereco = usuarios.endereco;
  salvar();
}

function salvar (){
  const arquivo = path.resolve(__dirname + '/../databases/Usuarios.json');
  fs.writeFileSync(arquivo,JSON.stringify(usuarios,null,4));

  
}

function deletarUsuario(idUsuario ){
  const deleteUsuario = usuarios.find((usuario)=> usuario.id == idUsuario);
  if(deleteUsuario == undefined){
    return error("Usuario inexistente");
  }
  usuarios.splice(deleteUsuario,1);
  salvar();
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

 async function listarUsuarios(){
  const usuariosFormatados = []
  const clientes = await Clientes.findAll({include: "Enderecos"})

  return clientes;

}



module.exports = {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  buscaUsuario,
  checaSenha,
  criarUsuario
};
