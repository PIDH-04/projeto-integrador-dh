window.addEventListener("load", () => {
  const imgVitrine = document.querySelector(".img-vitrine");
  const imgsProduto = document.querySelectorAll(".img-produto");
  const modal = document.querySelector(".modal");
  const botoesContainer = document.querySelector(".botoes-container");
  const closeModalButton = modal.querySelector(".fecha-modal");
  const imgModal = modal.querySelector("div > img");
  const proximaImg = botoesContainer.querySelector(".proxima-img");
  const anteriorImg = botoesContainer.querySelector(".anterior-img");
  const proximaImgModal = modal.querySelector(".proxima-img");
  const anteriorImgModal = modal.querySelector(".anterior-img");
  const btnSubtrai = document.getElementById("btn-subtrai");
  const btnAdiciona = document.getElementById("btn-adiciona");
  const quantidade = document.getElementById("quantidade");
  let posicaoImgVitrine = 0;
  let touchStart = 0;
  let touchEnd = 0;

  // Funções que lidam com avançar e retroceder imagens
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

  // Adiciona suporte a swipe da foto caso exista mais de uma foto.
  // Caso contrário remove as setas para troca de fotos

  if (imgsProduto.length < 2) {
    botoesContainer.style.display = "none";
    proximaImgModal.style.display = "none";
    anteriorImgModal.style.display = "none";
  } else {
    function lidaComSwipe() {
      if (touchStart > touchEnd) {
        retrocedeImagem();
      } else {
        avancaImagem();
      }
    }

    imgVitrine.addEventListener("touchstart", (event) => {
      touchStart = event.changedTouches[0].screenX;
    });

    imgVitrine.addEventListener("touchend", (event) => {
      touchEnd = event.changedTouches[0].screenX;
      lidaComSwipe();
    });
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
    if (window.innerWidth > 670) {
      modal.style.display = "block";
      imgModal.src = imgVitrine.src;
    }
  });

  proximaImgModal.addEventListener("click", () => {
    avancaImagem();
    imgModal.src = imgVitrine.src;
  });

  anteriorImgModal.addEventListener("click", () => {
    retrocedeImagem();
    imgModal.src = imgVitrine.src;
  });

  //Função para fechar o modal
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Botões para acrescer e decrescer quantidade do produto

  btnSubtrai.addEventListener("click", (e) => {
    if (quantidade.value > 1) {
      quantidade.value = parseInt(quantidade.value) - 1;
    }
  });

  btnAdiciona.addEventListener("click", (e) => {
    quantidade.value = parseInt(quantidade.value) + 1;
  });
});
