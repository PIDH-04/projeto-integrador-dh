const calculaSomaPrecos = require('../helpers/calculaSomaPrecos')
const { criaPedido, atualizaStatusPedido, detalhaPedido, listaPedidosDeUsuario } = require('../services/PedidosServices')
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
            const { status, cliente } = req.body
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
            const veioDePedidosDeCliente = req.query.cliente
            console.log(feedbackEdicao)
            const pedido = await detalhaPedido(idPedido)
            return res.render('detalhePedido', { pedido, statusPedidos, feedbackEdicao, veioDePedidosDeCliente })
            
        }catch(e){
            console.log(e)
            return res.render('detalhePedido')
        }
    },
    showPedidosDeUsuario: async (req, res) => {
        try{
            const { idCliente } = req.params
            const pedidos = await listaPedidosDeUsuario(idCliente)
            
            return res.render('adminPedidos', {pedidos, statusPedidos, showAcoes: false, clientePedidos: true})
        }catch(e){
            console.log(e)
            return res.redirect('/admin/pedidos')
        }
    }
}

module.exports = PedidosController