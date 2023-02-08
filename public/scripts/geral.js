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
    console.log(produto);
  }

  for (let i = 0; i < addCarrinhoBtn.length; i++) {
    addCarrinhoBtn[i].addEventListener("click", () => {
      onClickAddCarrinho(i);
    });
  }
});
