let areaexterna = document.querySelector('#areaexterna');
let areainterna = document.querySelector('#areainterna');
let idCategoria = document.querySelector('#idCategoria');
console.log(idCategoria.dataset.idcategoria)

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
