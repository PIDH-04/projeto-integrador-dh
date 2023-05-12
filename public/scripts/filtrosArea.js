window.addEventListener('load', function () {
  let areaexterna = document.querySelector('#areaexterna');
  let areainterna = document.querySelector('#areainterna');
  let idCategoria = document.querySelector('#idCategoria');
  let limpafiltro = document.querySelector('#limpafiltro');
  /* console.log(idCategoria.dataset.idcategoria) */
  let urlBase = window.location.origin + "/categorias/" + idCategoria.dataset.idcategoria;

  function checandoPagina() {
    if(window.location.href !== urlBase){
      let path = window.location.pathname;
      let arrayPath = path.split('/')
      if(arrayPath[arrayPath.length-1] == '2'){
        areaexterna.checked = true
      }
      else if(arrayPath[arrayPath.length-1] == '1'){
        areainterna.checked = true
      }
    }
  }
  checandoPagina();
  areaexterna.addEventListener('change', function () {
    if (this.checked = true) {
      let url = urlBase + "/2";
      window.location.href = url;
    }else{
      window.location.href = urlBase;
    }
  });

  areainterna.addEventListener('change', function () {
    if (this.checked = true) {
      let url = urlBase + "/1"
      window.location.href = url;
    }else{
      window.location.href = urlBase;
    }
  });

  limpafiltro.addEventListener('click', function () {
    window.location.href = urlBase;
  })
})

