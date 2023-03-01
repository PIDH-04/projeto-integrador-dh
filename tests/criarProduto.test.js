const ProdutosServices = require("../services/ProdutosServices")

const novoProduto = {
  nome: "julio",
  preco: 24.99,
  img: [],
  area: "interna",
  descricao: "jkfhlashdfalksdhaslkdhaslkidh",
  medidas: {
    comprimento: 2,
    largura: 2,
    altura: 5,
  }
};

console.log(ProdutosServices.criarProduto(novoProduto))



