const produtos = require("../databases/Produtos.json");

const gravarAcessoProduto = (req, res, next)=>{
    if(req.params === produtos.slug){
        //req.params ta pegando só o slug do produto acessado

        //score no banco de dados
    }

    next()
}

module.exports = gravarAcessoProduto;