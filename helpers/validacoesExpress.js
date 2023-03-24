const { check } = require("express-validator");

const validacoesExpress = {
  login: [
    check("email").notEmpty().bail().isEmail(),
    check("senha").notEmpty().bail().isLength({ min: 3 }),
  ],
};

module.exports = validacoesExpress;
