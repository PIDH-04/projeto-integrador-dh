window.addEventListener("load", () => {
  const produtosNoCarrinho = JSON.parse(localStorage.getItem("produtos"));
  const produtosContainer = document.querySelector(".produtos");
  const subtotalContainer = document.querySelector(".subtotal p");
  const totalContainer = document.querySelector(".total p");
  const valorProdutos = [];

  function criaProduto(produto) {
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
    subtotalContainer.innerText = `R$ ${somaFormatada}`;
    totalContainer.innerText = `R$ ${somaFormatada}`;
  }

  function addProdutos(arrayDeProdutos) {
    valorProdutos.length = 0;
    if (arrayDeProdutos === null || arrayDeProdutos.length == 0) {
      produtosContainer.innerHTML = `<p>Você ainda não adicionou nenhum produto no seu carrinho </p>`;
      subtotalContainer.innerText = ''
      totalContainer.innerText = ''
    } else {
      produtosContainer.innerHTML = ``;
      for (let produto of arrayDeProdutos) {
        criaProduto(produto);
      }
      addInfosDePreco(valorProdutos);
      const removerBtn = document.querySelectorAll(".removeBtn");

      removerBtn.forEach((btn, index) => {
        btn.addEventListener("click", () => removeProduto(index, removerBtn));
      });
    }
  }

  function removeProduto(index) {
    produtosNoCarrinho.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtosNoCarrinho));
    addProdutos(produtosNoCarrinho);
  }

  // Executa a função de adicionar os produtos do carrinho assim que a página carrega
  addProdutos(produtosNoCarrinho);
});
