const calculaSomaPrecos = require('../helpers/calculaSomaPrecos')
const { criaPedido, atualizaStatusPedido } = require('../services/PedidosServices')

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
    },
    alteraStatus: async (req, res) => {
        try{
            const { idPedido } = req.params
            const { status } = req.body
            await atualizaStatusPedido(idPedido, status)
            return res.redirect('/admin/pedidos?atualizado=true')
        }catch(e){
            console.log(e)
            return res.redirect('/admin/pedidos?atualizado=false')
        }
    },
    showDetalhes: (req, res) => {
        return res.render('detalhePedido')
    }
}

module.exports = PedidosController