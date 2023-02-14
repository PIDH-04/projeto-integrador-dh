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
      id: index,
    };

    return produtoFormatado;
  }

  function atualizaQuantidadeHeader() {
    const quantidadeDeProdutos = document.getElementById("span");
    quantidadeDeProdutos.innerText = produtosNoCarrinho.length;
  }

  function onClickAddCarrinho(index, estaNoCarrinho) {
    if (estaNoCarrinho == false) {
      formataBotaoJaAdd(addCarrinhoBtn[index]);
      const produto = formataProduto(produtos[index], index);
      produtosNoCarrinho.push(produto);
      localStorage.setItem("produtos", JSON.stringify(produtosNoCarrinho));
      atualizaQuantidadeHeader();
    }

    if (window.location.pathname.includes("/produto")) {
      return (window.location.href = "/carrinho");
    }
  }

  function formataBotaoJaAdd(produto) {
    produto.style.backgroundColor = "gray";
    produto.style.color = "white";
    produto.innerText = "Produto no carrinho";
  }

  function aoCarregarPagina() {
    atualizaQuantidadeHeader();
    for (let i = 0; i < addCarrinhoBtn.length; i++) {
      const estaNoCarrinho =
        produtosNoCarrinho.findIndex((p) => p.id == i) == -1 ? false : true;
      if (estaNoCarrinho == true) {
        formataBotaoJaAdd(addCarrinhoBtn[i]);
      }
      addCarrinhoBtn[i].addEventListener(
        "click",
        () => {
          onClickAddCarrinho(i, estaNoCarrinho);
        },
        { once: true }
      );
    }
  }

  aoCarregarPagina();
});
