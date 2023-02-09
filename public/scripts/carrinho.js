window.addEventListener("load", () => {
  const produtosNoCarrinho = JSON.parse(localStorage.getItem("produtos"));
  const produtosContainer = document.querySelector(".produtos");
  const subtotalContainer = document.querySelector(".subtotal p");
  const totalContainer = document.querySelector(".total p");
  const valorProdutos = [];

  function addProdutoNaPagina(produto) {
    let valorFormatado = produto.preco.replace("R$", "");
    valorFormatado = valorFormatado.replace(",", ".");
    valorProdutos.push(valorFormatado);

    const produtoContainer = document.createElement("div");
    produtoContainer.classList.add("produto");
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
                  <h2>${produto.nome}</h2>
                </a>
                <p class="variacao">Tampo madeira</p>
                <p class="quantidade">Quantidade: ${produto.quantidade}</p>
                <p class="preco">${produto.preco}</p>
              </div>
              <span class="removeBtn">Remover</span>
          `;
    produtosContainer.appendChild(produtoContainer);
  }

  function addInfosDePreco(arrayComvalores) {
    const soma = arrayComvalores.reduce(
      (anterior, atual) => parseFloat(anterior) + parseFloat(atual)
    );
    const somaFormatada = soma.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    subtotalContainer.innerText = somaFormatada;
    totalContainer.innerText = somaFormatada;
  }

  if (produtosNoCarrinho === null) {
    produtosContainer.innerHTML = `<p>Você ainda não adicionou nenhum produto no seu carrinho </p>`;
  } else {
    produtosContainer.innerHTML = ``;
    for (let produto of produtosNoCarrinho) {
      console.log(produto.nome);
      addProdutoNaPagina(produto);
    }
    addInfosDePreco(valorProdutos);

    const removerBtn = document.querySelectorAll(".removeBtn");

  }
});
