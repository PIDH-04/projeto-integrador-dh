function atualizaQuantidadeHeader() {
  const quantidadeDeProdutos = document.getElementById("span");
  const produtosNoCarrinho =
    JSON.parse(localStorage.getItem("produtos")) != null
      ? JSON.parse(localStorage.getItem("produtos"))
      : [];
  quantidadeDeProdutos.innerText = produtosNoCarrinho.length;
}

document.getElementById("menu-toggle").addEventListener("click", function () {
  var menuMobile = document.getElementById("menuMobile");
  if (menuMobile.style.display === "block") {
    menuMobile.style.display = "none";
  } else {
    menuMobile.style.display = "block";
  }
});

window.onload = function () {

  atualizaQuantidadeHeader();

  document.getElementById('categoriaMobile').addEventListener('click', () => {
    const submenuCategorias = document.getElementById('categoriasMobile');

    if (submenuCategorias.style.display === 'none') {
      submenuCategorias.style.display = "block";
    } else {
      submenuCategorias.style.display = "none";
    }
  });
}

window.addEventListener('load', function () {
  const termo = document.getElementById('busca');
  const divBusca = document.querySelector('.resultado-busca');
  const displayValue = localStorage.getItem('divBuscaDisplay');
  const query = location.search

  if(query !== '' && displayValue !== null){
    divBusca.style.display = displayValue;
  }else{
    divBusca.style.display = 'none';
  }

  termo.addEventListener('click', function () {
    divBusca.style.display = 'flex';
    localStorage.setItem('divBuscaDisplay', 'flex');
  })

  termo.addEventListener('input', function () {
    const query = termo.value;
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?busca=${query}`;

    history.pushState({ path: newUrl }, '', newUrl);
  });

  termo.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      localStorage.setItem('divBuscaDisplay', 'flex');
      location.reload();

    }
  });
})





