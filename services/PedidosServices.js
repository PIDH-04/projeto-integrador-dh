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

module.exports = {
    criaPedido
}