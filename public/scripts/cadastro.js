window.addEventListener("load", () => {
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // let divErrors = document.getElementById('div-errors');
    // let ulErros = document.querySelector('div.errors ul');

    const ulErros = document.getElementById("ulErros");

    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmarSenha");

    ulErros.style.display = "none";

    const errosCadastro = document.getElementById("errors");

    const erros = [];
    erros.length = 0;

    ulErros.innerHTML = "";

    if (nomeInput.value == " ") {
      erros.push("o campo nome não pode estar vazio");
    } else if (nomeInput.value.length < 5) {
      erros.push("o campo nome deve ter mais de 5 caracteres");
    }

    if (emailInput.value == "") {
      erros.push("digite um email valido");
    } else if (emailInput.value.length < 5) {
      erros.push("Ex maria@gmail.com");
    }

    if (senhaInput.value == "") {
      erros.push("campo não pode estar vazio");
    } else if (senhaInput.value.length < 8) {
      erros.push("Senha com minimo de 8 caracteres");
    }

    if (confirmarSenhaInput.value.length == "") {
      erros.push("campo não pode estar vazio");
    } else if (confirmarSenhaInput.value != senhaInput.value) {
      erros.push("senha nao confere, digite novamente");
    }

    if (erros.length > 0) {
      e.preventDefault();

      // divErrors.classList.remove('no-errors');
      // divErrors.classList.add('errors');
      ulErros.style.display = "block";

      for (let i = 0; i < erros.length; i++) {
        ulErros.innerHTML += "<li>" + erros[i] + "</li>";
      }
    } else {
      window.location.href = "/checkoutDeEndereco";
    }

    console.log(erros);

    console.log("projeto");

    // this.reset();
  });

  document.querySelector(".formLogin").addEventListener("submit", function (e) {
    let ulErros = document.querySelector("#errors2 ul");

    const email2Input = document.getElementById("email-login");
    const senha2Input = document.getElementById("senha-login");

    const errosCadastro = document.getElementById("errors2");

    const erros1 = [];
    erros1.length = 0;
    ulErros.innerHTML = "";
    errosCadastro.style.display = 'none'


    if (email2Input.value == " ") {
      erros1.push("o campo nome não pode estar vazio");
    } else if (email2Input.value.length < 5) {
      erros1.push("O E-mail deve ser preenchido");
    }

    if (senha2Input.value == "") {
      erros1.push("A senha deve ser preenchida");
    }

    if (erros1.length > 0) {
      e.preventDefault();

      for(let erro of erros1){
        ulErros.innerHTML += `<li>${erro}</li>`
      }

      errosCadastro.style.display = 'block'
    }
  });
});
