document.getElementById("menu-toggle").addEventListener("click", function() {
    var menuMobile = document.getElementById("menuMobile");
    if (menuMobile.style.display === "block") {
      menuMobile.style.display = "none";
    } else {
      menuMobile.style.display = "block";
    }
  });

document.getElementById('areaInterna').addEventListener('click', () => {
    const submenuCategorias = document.getElementById('categoriasInternas');

    if (submenuCategorias.style.display === 'none'){
      submenuCategorias.style.display = "block";
    } else {
      submenuCategorias.style.display = "none";
    }
  });

  document.getElementById('areaExterna').addEventListener('click', () => {
    const submenuCategorias = document.getElementById('categoriasExternas');

    if (submenuCategorias.style.display === 'none'){
      submenuCategorias.style.display = "block";
    } else {
      submenuCategorias.style.display = "none";
    }
  });