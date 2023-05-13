const {Produtos} = require("../databases/models");
const {Visitas} = require('../databases/models');

const gravarAcessoProduto = (req, res, next)=>{
    if(req.params === Produtos.id){
        //req.params ta pegando só o id do produto acessado

        //score no banco de dados
        Visitas.create({
            produtos_id:req.params
        })
    }

    next()
}

module.exports = gravarAcessoProduto;