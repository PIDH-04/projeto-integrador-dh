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
  const cliente = Clientes.findOne({ where: { email: email } });

  return cliente;
}

//criar cliente
async function criarCliente(infosCliente) {
  console.log(infosCliente);
 try {
 infosCliente.senha = bcrypt.hashSync(infosCliente.senha, 8)
  const novoCliente = await Clientes.create(infosCliente);
 // const {senha: _,...clienteSemSenha} = novoCliente
 const cliente = {...clienteSemSenha}
 console.log(cliente);
  return clienteSemSenha;
  
 } catch (error) {
  console.log(error);
  
  
 } 
}



function checaSenha(cliente, senha) {
  return bcrypt.compareSync(senha, cliente.senha);
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

//mostra cliente especifico pela id
async function buscaClienteId(idCliente) {
  const cliente = await Clientes.findByPk(idCliente);
  const {senha: _,...clienteSemSenha} = cliente
  return clienteSemSenha;
}

module.exports = {
  buscaClienteId,
  listaClientes,
  criarCliente,
  deletarCliente,
  buscaCliente,
  checaSenha,
  editarCliente
};
