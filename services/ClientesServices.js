const bcrypt = require("bcrypt");
const { Clientes } =require('../databases/models');
const fs = require('fs');
const path = require('path');

//listar clientes
async function listaClientes(){
  const clientes = await Clientes.findAll({include: "enderecos"})

  return clientes;
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

//deleta cliente
async function deletarCliente(idCliente){
  let clienteParaRemover = await Clientes.destroy({ where: { id: idCliente}});

  if (clienteParaRemover == 0) {
    throw new Error("Cliente inexistente");
  }
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










module.exports = {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  buscaCliente,
  checaSenha,
  criarUsuario
};
