const calculaSomaPrecos = require('../helpers/calculaSomaPrecos')
const { criaPedido } = require('../services/PedidosServices')

const PedidosController = {
    criar: async (req, res) => {
        const { pagamento, idEndereco} = req.query
        try{
            const produtos = JSON.parse(req.body.produtos)
            const produtosPedidos = produtos.map(produto => {
                return {produtos_id: produto.id, quantidade: produto.quantidade}
            })

            const somaProdutos = calculaSomaPrecos(produtos)
            const pedido = await criaPedido({
                enderecos_id: idEndereco,
                clientes_id: req.session.cliente.id,
                preco: somaProdutos,
                formas_de_pagamento_id: pagamento,
                produtosPedidos
            })
            
            return res.redirect('/finalizacao-compra')

        }catch(e){
            console.log(e)
            return res.redirect(`/checkoutPagamento/${pagamento}`)
        }
    }
}

module.exports = PedidosController