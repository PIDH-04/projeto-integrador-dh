const bcrypt = require("bcrypt");
const { Clientes, Enderecos } = require("../databases/models");
const { Pedidos } = require("../databases/models");
const fs = require("fs");
const path = require("path");

//Listar pedidos entre datas
async function buscarPedidosEntreDatas(dataInicial, dataFinal) {
  const pedidos = await Pedidos.findAll({
    where: {
      createdAt: {
        [Op.between]: [dataInicial, dataFinal],
      },
      attributes: ["id", "createdAt", "entregueAt", "pagoAt"],
    },
    include: [
      {
        model: Clientes,
        as: "clientes",
        attributes: ["nome", "email"],
      },
    ],
  });

  return pedidos;
}

//listar clientes
async function listaClientes() {
  const clientes = await Clientes.findAll({ include: "enderecos" });

  return clientes;
}

//mostra cliente especifico por email
async function buscaCliente(email) {
  const cliente = await Clientes.findOne({ where: { email: email } });

  return cliente;
}

//mostra cliente especifico por id
async function buscaClienteId(idCliente) {
  const cliente = await Clientes.findByPk(idCliente);

  return cliente;
}

//criar cliente
// async function criarCliente(infosCliente) {
//   console.log(infosCliente);
//  try {
//   const novoCliente = await Clientes.create(infosCliente);
//  } catch (error) {
//   console.log(error);
//  }
// }

//criar cliente
async function criarCliente(infosCliente) {
  console.log(infosCliente);
  try {
    infosCliente.senha = bcrypt.hashSync(infosCliente.senha, 8);
    const novoCliente = await Clientes.create(infosCliente);
    const cliente = {
      id: novoCliente.id,
      nome: novoCliente.nome,
      email: novoCliente.email
    }
    return cliente;
  } catch (error) {
    console.log(error);
    throw new Error(e)
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
  }

  await cliente.update(novasInfos);
}

async function listaEnderecos(idCliente) {
  try {
    const enderecos = await Enderecos.findAll({
      where: { clientes_id: idCliente },
    });
    return enderecos;
  } catch (e) {
    throw new Error(e);
  }
}

async function adicionaEndereco(idCliente, informacoesEndereco) {
  try {
    let cep = informacoesEndereco.cep;
    cep = cep.replace("-", "");
    const endereco = {
      ...informacoesEndereco,
      clientes_id: idCliente,
      cep,
    };

    const novoEndereco = await Enderecos.create(endereco);
    return novoEndereco;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  listaClientes,
  buscarPedidosEntreDatas,
  criarCliente,
  deletarCliente,
  buscaCliente,
  buscaClienteId,
  checaSenha,
  editarCliente,
  listaEnderecos,
  adicionaEndereco,
};
