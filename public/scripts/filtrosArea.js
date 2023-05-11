let areaexterna = document.querySelector('#areaexterna');
let areainterna = document.querySelector('#areainterna');
let idCategoria = document.querySelector('#idCategoria');
let limpafiltro = document.querySelector('#limpafiltro');
/* console.log(idCategoria.dataset.idcategoria) */

areaexterna.addEventListener('change', function(){
  if(this.checked){
    let url = window.location.origin + "/categorias/" + idCategoria.dataset.idcategoria + "/2";
    window.location.href = url;
  }
});

areainterna.addEventListener('change', function(){
    if(this.checked){
        let url = window.location.origin + "/categorias/" + idCategoria.dataset.idcategoria + "/1"
        window.location.href = url;
    }
});

limpafiltro.addEventListener('click', function(){
    let url = window.location.origin + "/categorias/" + idCategoria.dataset.idcategoria
    window.location.href = url;
})
