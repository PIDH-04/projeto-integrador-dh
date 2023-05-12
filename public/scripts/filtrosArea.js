window.addEventListener('load', function () {
  let areaexterna = document.querySelector('#areaexterna');
  let areainterna = document.querySelector('#areainterna');
  let idCategoria = document.querySelector('#idCategoria');
  let limpafiltro = document.querySelector('#limpafiltro');
  let menorpreco = document.querySelector('#menorpreco');
  let maiorpreco = document.querySelector('#maiorpreco');
  let novidades = document.querySelector('#novidades');
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

  /* menorpreco.addEventListener('click', function(){
    if(areaexterna.checked = true){
      let url = urlBase + "/2" + "/menor";
      window.location.href = url;
    }
    if(areainterna.checked = true){
      let url = urlBase + "/1" + "/menor";
      window.location.href = url;
    }else{
      let url = urlBase + "/menor";
      window.location.href = url;
    }
  }) */

 /*  maiorpreco.addEventListener('click', function(){
    if(areaexterna.checked = true){
      let url = urlBase + "/2" + "/maior";
      window.location.href = url;
    }
    if(areainterna.checked = true){
      let url = urlBase + "/1" + "/maior";
      window.location.href = url;
    }else{
      let url = urlBase + "/maior";
      window.location.href = url;
    }
  })
 */
  novidades.addEventListener('click', function(){
    if(areaexterna.checked = true){
      let url = urlBase + "/2" + "/novidades";
      window.location.href = url;
    }
    if(areainterna.checked = true){
      let url = urlBase + "/1" + "/novidades";
      window.location.href = url;
    }else{
      let url = urlBase + "/novidades";
      window.location.href = url;
    }
  })

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

