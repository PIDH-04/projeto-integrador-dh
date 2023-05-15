const { Pedidos, Pedidos_has_produtos } = require('../databases/models')

async function criaPedido(infoPedido){
    try{
        const novoPedido = await Pedidos.create(infoPedido)
        const produtos = infoPedido.produtosPedidos.map((produto) => {
            return {
                ...produto,
                pedidos_id: novoPedido.id
            }
        })

        await Pedidos_has_produtos.bulkCreate(produtos)
        return novoPedido
    }catch(e){
        throw new Error(e)
    }
}

async function listaTodosOsPedidos(){
    try{
        const pedidos = await Pedidos.findAll({include: 'clientes'})
        return pedidos
    }catch(e){
        throw new Error(e)
    }
}

async function atualizaStatusPedido(id, status){
    try{
        await Pedidos.update({status: status}, {where: {id: id}})
    }catch(e){
        throw new Error(e)
    }
}

async function detalhaPedido(id){
    try{
        const produto = await Pedidos.findByPk(id, {include: ['produtos', 'clientes', 'formas_de_pagamento', 'enderecos']})
        return produto

    }catch(e){
        throw new Error(e)
    }
}

module.exports = {
    criaPedido,
    listaTodosOsPedidos,
    atualizaStatusPedido,
    detalhaPedido
}