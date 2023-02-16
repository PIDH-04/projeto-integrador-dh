function atualizaQuantidadeHeader() {
  const quantidadeDeProdutos = document.getElementById("span");
  const produtosNoCarrinho =
  JSON.parse(localStorage.getItem("produtos")) != null
    ? JSON.parse(localStorage.getItem("produtos"))
    : [];
  quantidadeDeProdutos.innerText = produtosNoCarrinho.length;
}

document.getElementById("menu-toggle").addEventListener("click", function() {
    var menuMobile = document.getElementById("menuMobile");
    if (menuMobile.style.display === "block") {
      menuMobile.style.display = "none";
    } else {
      menuMobile.style.display = "block";
    }
  });

  window.onload = function() {

    atualizaQuantidadeHeader();

    document.getElementById('categoriaMobile').addEventListener('click', () => {
      const submenuCategorias = document.getElementById('categoriasMobile');
  
      if (submenuCategorias.style.display === 'none'){
        submenuCategorias.style.display = "block";
      } else {
        submenuCategorias.style.display = "none";
      }
    });
  }
  
  
  
  
  