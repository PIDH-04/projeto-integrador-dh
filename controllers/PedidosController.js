const calculaSomaPrecos = require('../helpers/calculaSomaPrecos')
const { criaPedido, atualizaStatusPedido, detalhaPedido } = require('../services/PedidosServices')
const statusPedidos = require('../databases/statusPedidos.json')

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
            const { detalhe } = req.query
            await atualizaStatusPedido(idPedido, status)

            if(detalhe){
                return res.redirect(`/admin/pedidos/${idPedido}?atualizado=true`)
            }else{
                return res.redirect('/admin/pedidos?atualizado=true')
            }

        }catch(e){
            console.log(e)
            return res.redirect('/admin/pedidos?atualizado=false')
        }
    },
    showDetalhes: async (req, res) => {
        try{
            const  { idPedido } = req.params
            const feedbackEdicao = req.query.atualizado
            console.log(feedbackEdicao)
            const pedido = await detalhaPedido(idPedido)
            return res.render('detalhePedido', { pedido, statusPedidos, feedbackEdicao })
            
        }catch(e){
            console.log(e)
            return res.render('detalhePedido')
        }
    }
}

module.exports = PedidosController