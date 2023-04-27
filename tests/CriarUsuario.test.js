const  UsuariosServices = require("../services/UsuariosServices");

const novoUsuario = {
    "nome":"henrique teste",
    "email":"polentina@gmail.com",
    "senha":"12345678",
    "cep":90100000,
    "endereço":"Rua Juju Ferreira",
    "numero": 100,
    "complemento": 47,
    "bairro": "parecida",
    "cidade": "jacuí",
    "estado": "AP",
    "nome no cartao": "Polentina Gonzales",
    "numero do cartao": "4267189391245",
    "mes":12,
    "ano":27,
    "cvv":248,
    "pedidos":[1, 2, 3]
};

console.log(UsuariosServices.criarUsuario(novoUsuario))

