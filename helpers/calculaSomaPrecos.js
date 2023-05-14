function calculaSomaPrecos(produtos) {
  const precos = [];
  produtos.map((produto) => {
    let precoNumeral = produto.preco.replace("R$", "");
    precoNumeral = parseFloat(precoNumeral);
    if (produto.quantidade > 1) {
      precoNumeral = precoNumeral * produto.quantidade;
    }
    precos.push(precoNumeral);
  });
  const precoInicial = 0;
  const valorFinal = precos.reduce(
    (valorSomado, preco) => valorSomado + preco,
    precoInicial
  );

  return valorFinal
}

module.exports = calculaSomaPrecos;
