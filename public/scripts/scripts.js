// Botões para acrescer e decrescer quantidade do produto
const btnSubtrai = document.getElementById("btn-subtrai");
const btnAdiciona = document.getElementById("btn-adiciona");
const quantidade = document.getElementById("quantidade");

btnSubtrai.addEventListener("click", (e) => {
  if (quantidade.value > 1) {
    quantidade.value = parseInt(quantidade.value) - 1;
  }
});

btnAdiciona.addEventListener("click", (e) => {
  quantidade.value = parseInt(quantidade.value) + 1;
});

