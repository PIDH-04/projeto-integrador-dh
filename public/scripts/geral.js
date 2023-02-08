window.addEventListener("load", () => {
  /**
   * Script que cuida da parte de adição do produto no carrinho
   */
  const produtos = document.querySelectorAll(".produto");
  const addCarrinhoBtn = document.querySelectorAll(".add-cart");

  function formataProduto(produto) {
    const produtoFormatado = {
      nome: produto.querySelector("h3").innerText,
      img: produto.querySelector(".img-container img").src,
      preco: produto.querySelector(".informacoes-container p").innerText,
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
