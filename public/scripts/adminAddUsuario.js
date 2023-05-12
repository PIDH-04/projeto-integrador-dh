window.addEventListener("load", () => {
  const form = document.getElementById("novo-produto-form");
  const erroNome = document.getElementById("erro-nome");
  const erroEmail = document.getElementById("erro-email");
  const erroSenha = document.getElementById("erro-senha");
  const erroConfirmacaoSenha = document.getElementById("erro-confirma-senha");

  form.addEventListener("submit", (e) => {
    erroNome.innerText = "";
    erroEmail.innerText = "";
    erroSenha.innerText = "";
    erroConfirmacaoSenha.innerText = "";

    const camposForm = Array.from(form.elements);
    const campos = {};

    camposForm.forEach((campo) => {
      campos[campo.id] = campo.value;
    });

    if (campos.nome == "") {
      e.preventDefault();
      erroNome.innerText = "É necessário preencher o nome";
    }

    if (campos.email == "") {
      e.preventDefault();
      erroEmail.innerText = "É necessário preencher o email";
    }

    if (campos.senha == "") {
      e.preventDefault();
      erroSenha.innerText = "É necessário preencher a senha";
    } else if (campos.senha.length < 5) {
      e.preventDefault();
      erroSenha.innerText = "O tamanho mínimo da senha é de 5 letras";
    } else if (campos.confirmaSenha == "") {
      e.preventDefault();
      erroConfirmacaoSenha.innerText = "É necessário confirmar a senha";
    } else if (campos.confirmaSenha != campos.senha) {
      e.preventDefault();
      erroConfirmacaoSenha.innerText = "As senhas não são iguais";
    }
  });
});
