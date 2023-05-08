const bcrypt = require("bcrypt");
const { Clientes } = require('../databases/models');
const fs = require('fs');
const path = require('path');

//listar clientes
async function listaClientes() {
  const clientes = await Clientes.findAll({ include: "enderecos" })

  return clientes;
}

//mostra cliente especifico
async function buscaCliente(email) {
  const cliente = Clientes.findAll({ where: { email: email } });

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
async function deletarCliente(idCliente) {
  let clienteParaRemover = await Clientes.destroy({ where: { id: idCliente } });

  if (clienteParaRemover == 0) {
    throw new Error("Cliente inexistente");
  }
}

//editar cliente
async function editarCliente(idCliente, novasInfos) {
  //acha o cliente a ser editado pelo id
  const cliente = await Clientes.findByPk(idCliente);

  //da error se o id do cliente não corresponder a nenhum
  if (cliente === undefined) {
    throw new Error("Cliente inexistente");
  };

  await cliente.update(novasInfos);
}

module.exports = {
  listaClientes,
  criarCliente,
  deletarCliente,
  buscaCliente,
  checaSenha,
  criarCliente
};
