window.addEventListener("load", () => {
  /**
   * Script que cuida da parte de adição do produto no carrinho
   */
  const produtos = document.querySelectorAll(".produto");
  const addCarrinhoBtn = document.querySelectorAll(".add-cart");
  const seletorQuantidade = document.querySelector(".seletor-quantidade input");

  function formataProduto(produto) {
    const produtoFormatado = {
      nome: produto.querySelector(".titulo-produto").innerText,
      img: produto.querySelector(".imagem-produto").src,
      preco: produto.querySelector(".preco-produto").innerText,
      quantidade:
        seletorQuantidade !== null ? parseInt(seletorQuantidade.value) : 1,
    };

    return produtoFormatado;
  }

  function onClickAddCarrinho(index) {
    const produto = formataProduto(produtos[index]);
    const produtosNoCarrinho = JSON.parse(localStorage.getItem("produtos"));

    if (produtosNoCarrinho === null) {
      const produtos = [];
      produtos.push(produto);
      return localStorage.setItem("produtos", JSON.stringify(produtos));
    } else {
      produtosNoCarrinho.push(produto);
      return localStorage.setItem(
        "produtos",
        JSON.stringify(produtosNoCarrinho)
      );
    }
  }

  for (let i = 0; i < addCarrinhoBtn.length; i++) {
    addCarrinhoBtn[i].addEventListener("click", () => {
      onClickAddCarrinho(i);
    });
  }
});
