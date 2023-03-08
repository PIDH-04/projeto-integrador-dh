const checaAutenticacaoUsuario = (req, res, next) => {
    const enderecoAcessado = req.originalUrl
    if(!req.session.usuarioLogado){
        return res.redirect(`/cadastro?target=${enderecoAcessado}`)
    }

    next()
}

module.exports = checaAutenticacaoUsuario