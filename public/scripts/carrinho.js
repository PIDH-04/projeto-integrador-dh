window.addEventListener("load", () => {
  const produtosNoCarrinho = JSON.parse(localStorage.getItem("produtos"));
  const produtosContainer = document.querySelector(".produtos");
  console.log(produtosNoCarrinho);

  if (produtosNoCarrinho === null) {
    produtosContainer.innerHTML = `<p>Você ainda não adicionou nenhum produto no seu carrinho </p>`;
  } else {
    produtosContainer.innerHTML = ``;

    for (let produto of produtosNoCarrinho) {
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
                <span>Remover</span>
            `;
      produtosContainer.appendChild(produtoContainer);
    }
  }
});
