const checaAutenticacaoAdmin = (req, res, next) => {
    const enderecoAcessado = req.originalUrl
    if(!req.session.adminLogado){
        return res.redirect(`/admin?target=${enderecoAcessado}`)
    }

    next()
}

module.exports = checaAutenticacaoAdmin