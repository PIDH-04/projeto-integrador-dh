const { check } = require("express-validator");

const validacoesExpress = {
  login: [
    check("email").notEmpty().bail().isEmail(),
    check("senha").notEmpty().bail().isLength({ min: 3 }),
  ],
  criacaoProduto: [
    check("nome").notEmpty().bail().trim().withMessage('O nome do produto deve ser preenchido'),
    check("descricao").notEmpty().bail().trim().withMessage('A descrição deve ser preenchida'),
    check("largura").notEmpty().withMessage('A largura deve ser informada')
      .bail().isNumeric().withMessage('largura inválida'),
    check("altura").notEmpty().withMessage('A altura deve ser preenchida')
      .bail().isNumeric().trim().withMessage('altura inválida'),
    check("comprimento").notEmpty().withMessage('O comprimento deve ser preenchido')
      .bail().isNumeric().trim().withMessage('comprimento inválido'),
    check("preco").notEmpty().withMessage('O preço deve ser preenchido')
      .bail().isNumeric().trim().withMessage('preço inválido'),
    check("categoria").notEmpty().withMessage('A categoria deve ser selecionada'),
    check("area").notEmpty().withMessage('A área deve ser preenchida'),
    check("imagens").custom((value, { req }) => {
      if (req.files.length < 1) {
        return false;
      }
      return true;
    }).withMessage('É necessário adicionar uma foto ao produto')
  ],
  criacaoBanner: [
    check("nome").notEmpty().bail().trim().withMessage('O nome do banner deve ser preenchido'),
    check("imagem").custom((value, { req }) => {
      if (req.file.length < 1) {
        return false;
      }
      return true;
    }).withMessage('É necessário adicionar uma imagem do banner')
  ]
};

module.exports = validacoesExpress;
