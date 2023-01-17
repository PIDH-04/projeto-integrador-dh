window.addEventListener("load", () => {
  const imgVitrine = document.querySelector(".img-vitrine");
  const imgsProduto = document.querySelectorAll(".img-produto");
  const modal = document.querySelector(".modal");
  const closeModalButton = modal.querySelector("span");
  const imgModal = modal.querySelector("div img");
  const proximaImg = document.querySelector(".proxima-img");
  const anteriorImg = document.querySelector(".anterior-img");
  let posicaoImgVitrine = 0;

  function avancaImagem() {
    if (posicaoImgVitrine < imgsProduto.length - 1) {
      imgVitrine.src = imgsProduto[posicaoImgVitrine + 1].src;
      posicaoImgVitrine++;
    } else {
      imgVitrine.src = imgsProduto[0].src;
      posicaoImgVitrine = 0;
    }
  }

  function retrocedeImagem() {
    if (posicaoImgVitrine > 0) {
      imgVitrine.src = imgsProduto[posicaoImgVitrine - 1].src;
      posicaoImgVitrine--;
    } else {
      imgVitrine.src = imgsProduto[imgsProduto.length - 1].src;
      posicaoImgVitrine = imgsProduto.length - 1;
    }
  }

  if (imgsProduto.length == 1) {
    proximaImg.style.display = "none";
    anteriorImg.style.display = "none";
  }

  // Adiciona um escutador em todos as imagens do produto

  for (let i = 0; i < imgsProduto.length; i++) {
    imgsProduto[i].addEventListener("click", () => {
      imgVitrine.src = imgsProduto[i].src;
      posicaoImgVitrine = i;
    });
  }

  // Adiciona o escutador no botão de próxima foto
  proximaImg.addEventListener("click", avancaImagem);

  anteriorImg.addEventListener("click", retrocedeImagem);

  // Altera o estilo do modal para block quando clica na imagem em destaque
  imgVitrine.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    imgModal.src = imgVitrine.src;
  });

  //Funções para fechar o modal
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
