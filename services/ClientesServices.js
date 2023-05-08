const bcrypt = require("bcrypt");
const { Clientes } =require('../databases/models');
const fs = require('fs');
const path = require('path');

//listar clientes
async function listaClientes(){
  const clientes = Clientes.findAll();
  return clientes
}

//mostra cliente especifico
async function buscaCliente(email) {
  const cliente = Clientes.findAll({where:{email:email}});
  return cliente;
}

//criar cliente
async function criarCliente(infosCliente) {
  const novoCliente = await Clientes.create(infosCliente);
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


function deletarUsuario(idUsuario ){
  const deleteUsuario = usuarios.find((usuario)=> usuario.id == idUsuario);
  if(deleteUsuario == undefined){
    return error("Usuario inexistente");
  }
  usuarios.splice(deleteUsuario,1);
  salvar();
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
  buscaCliente,
  checaSenha,
  criarUsuario
};
