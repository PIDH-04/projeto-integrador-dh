window.addEventListener("load", () => {
  const form = document.getElementById("novo-produto-form");
  const erroNome = document.querySelector(".erro-nome");
  const erroLargura = document.querySelector(".erro-largura");
  const erroProfundidade = document.querySelector(".erro-profundidade");
  const erroAltura = document.querySelector(".erro-altura");
  const erroPeso = document.querySelector(".erro-peso");
  const erroDescricao = document.querySelector(".erro-descricao");
  const erroPreco = document.querySelector(".erro-preco");
  const erroImg = document.querySelector(".erro-img");
  const erroCategoria = document.querySelector(".erro-categoria");
  const erroArea = document.querySelector(".erro-area");
  const campoImg = document.getElementById("img");

  form.addEventListener("submit", (e) => {
    erroNome.innerText = "";
    erroLargura.innerText = "";
    erroProfundidade.innerText = "";
    erroAltura.innerText = "";
    erroDescricao.innerText = "";
    erroPeso.innerText = "";
    erroPreco.innerText = "";
    erroImg.innerText = "";
    erroCategoria.innerText = "";
    erroArea.innerText = "";

    const camposForm = Array.from(form.elements);
    const campos = {};

    camposForm.forEach((campo) => {
      campos[campo.id] = campo.value;
    });

    if (campos.nome == "") {
      e.preventDefault();
      erroNome.innerText = "É necessário preencher o nome";
    }

    if (campos.largura == "") {
      e.preventDefault();
      erroLargura.innerText = "Campo obrigatório";
    }

    if (campos.profundidade == "") {
      e.preventDefault();
      erroProfundidade.innerText = "Campo obrigatório";
    }

    if (campos.altura == "") {
      e.preventDefault();
      erroAltura.innerText = "Campo obrigatório";
    }

    if (campos.peso == "") {
      e.preventDefault();
      erroPeso.innerText = "Campo obrigatório";
    }

    if (campos.descricao == "") {
      e.preventDefault();
      erroDescricao.innerText = "Necessário preencher a descrição";
    }

    if (campos.preco == "") {
      e.preventDefault();
      erroPreco.innerText = "Necessário preencher o preço";
    }

    if (campoImg.files.length == 0) {
      e.preventDefault();
      erroImg.innerText = "Necessário adicionar ao menos uma imagem";
    }

    if (campos.categorias == "Selecione uma categoria") {
      e.preventDefault();
      erroCategoria.innerText = "Necessário selecionar uma categoria";
    }

    if (campos.areas == "Selecione uma área") {
      e.preventDefault();
      erroArea.innerText = "Necessário selecionar uma área";
    }
  });
});
