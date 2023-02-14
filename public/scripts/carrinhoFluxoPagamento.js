window.addEventListener("load", () => {
  const produtosNoCarrinho =
    JSON.parse(localStorage.getItem("produtos")) != null
      ? JSON.parse(localStorage.getItem("produtos"))
      : [];
  const produtosContainer = document.querySelector(".produtos");
  const subtotalContainer = document.querySelector(".subtotal .valor");
  const totalContainer = document.querySelector(".total .valor");
  let valorProdutos = 0;

  function formataPreco(preco) {
    return preco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  function addInfosDePreco(valorFinal) {
    const somaFormatada = formataPreco(valorFinal);
    subtotalContainer.innerText = `${somaFormatada}`;

    if (window.location.pathname.includes("/checkoutPagamento")) {
      //Só calcula o valor do frete caso o usuário esteja na página de pagamento
      const frete = document.querySelector(".frete .valor");

      let valorFormatado = frete.innerText.replace("R$", "");
      valorFormatado = valorFormatado.replace(",", ".");

      const somaFrete = parseFloat(valorFinal) + parseFloat(valorFormatado);
      const totalFormatado = formataPreco(somaFrete);
      totalContainer.innerText = `${totalFormatado}`;
    } else {
      totalContainer.innerText = `${somaFormatada}`;
    }
  }

  function criaProduto(produto) {
    // Soma o produto ao valor final do carrinho
    let valorFormatado = produto.preco.replace("R$", "");
    valorFormatado = valorFormatado.replace(",", ".");
    valorProdutos = valorProdutos + valorFormatado * produto.quantidade;

    const produtoContainer = document.createElement("div");
    produtoContainer.classList.add("card-produto-carrinho");
    produtoContainer.innerHTML = `
                    <div class="img-container">
                        <a href="/produto">
                            <img
                            src="${produto.img}"
                            alt="${produto.nome}"
                            />
                        </a>
                    </div>
                    <div class="produto-info">
                        <a href="/produto">
                            <h5>${produto.nome}</h5>
                        </a>
                        <p class="variacao">Tampo madeira</p>
                        <p class="quantidade">Quantidade: ${produto.quantidade}</p>
                        <p class="preco">${produto.preco}</p>
                    </div>
              `;
    produtosContainer.appendChild(produtoContainer);
  }

  function addProdutos(arrayDeProdutos) {
    for (let produto of arrayDeProdutos) {
      criaProduto(produto);
    }
    addInfosDePreco(valorProdutos);
  }

  addProdutos(produtosNoCarrinho);
});
