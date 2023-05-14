window.addEventListener("load", () => {
  /**
   * Script que cuida da parte de adição do produto no carrinho
   */
  const produtos = document.querySelectorAll(".produto");
  const addCarrinhoBtn = document.querySelectorAll(".add-cart");
  const seletorQuantidade = document.querySelector(".seletor-quantidade input");
  const produtosNoCarrinho =
    JSON.parse(localStorage.getItem("produtos")) != null
      ? JSON.parse(localStorage.getItem("produtos"))
      : [];

  function formataProduto(produto, index) {
    const produtoFormatado = {
      nome: produto.querySelector(".titulo-produto").innerText,
      img: produto.querySelector(".imagem-produto").src,
      preco: produto.querySelector(".preco-produto").innerText,
      quantidade:
        seletorQuantidade !== null ? parseInt(seletorQuantidade.value) : 1,
      id: addCarrinhoBtn[index].dataset.idproduto,
    };

    return produtoFormatado;
  }

  function atualizaQuantidadeHeader() {
    const quantidadeDeProdutos = document.getElementById("span");
    quantidadeDeProdutos.innerText = produtosNoCarrinho.length;
  }

  function onClickAddCarrinho(index, estaNoCarrinho, produto) {
    if (produto == undefined) {
      formataBotaoJaAdd(addCarrinhoBtn[index]);
      const produto = formataProduto(produtos[index], index);
      produtosNoCarrinho.push(produto);
      localStorage.setItem("produtos", JSON.stringify(produtosNoCarrinho));
      atualizaQuantidadeHeader();
    }

    if (window.location.pathname.includes("/produto")) {
      return (window.location.href = "/carrinho");
    }
    console.log('funciona')
  }

  function formataBotaoJaAdd(produto) {
    produto.style.backgroundColor = "gray";
    produto.style.color = "white";

    if (window.location.pathname.includes("/produto")) {
      produto.innerText = "Produto no carrinho, seguir para pagamento";
    }else {
      produto.innerText = "Produto no carrinho";

    }
  }

  function aoCarregarPagina() {
    atualizaQuantidadeHeader();
    console.log(addCarrinhoBtn[0].dataset.idproduto)
    for (let i = 0; i < addCarrinhoBtn.length; i++) {
        const produto = produtosNoCarrinho.find((p) => p.id == addCarrinhoBtn[i].dataset.idproduto)
        if (produto !== undefined) {
          formataBotaoJaAdd(addCarrinhoBtn[i]);
        }
        addCarrinhoBtn[i].addEventListener(
          "click",
          () => {
            onClickAddCarrinho(i, produtos[i], produto);
          },
          { once: true }
        );
      }
  }

  aoCarregarPagina();
});
