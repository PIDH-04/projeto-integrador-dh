const { check } = require("express-validator");

const validacoesExpress = {
  login: [
    check("email").notEmpty().bail().isEmail(),
    check("senha").notEmpty().bail().isLength({ min: 3 }),
  ],
  criacaoProduto: [
    check("nome").notEmpty().bail().trim(),
    check("largura").notEmpty().bail().isNumeric().trim(),
    check("altura").notEmpty().bail().isNumeric().trim(),
    check("comprimento").notEmpty().bail().isNumeric().trim(),
    check("preco").notEmpty().bail().isNumeric().trim(),
    check("categoria").notEmpty(),
    check("area").notEmpty()
  ]
};

module.exports = validacoesExpress;
