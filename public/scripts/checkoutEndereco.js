window.addEventListener("load", () => {
  const formNovoEndereco = document.getElementById("form-novo-endereco");
  const formSelectEndereco = document.getElementById("form-select-endereco");
  const selectEndereco = formSelectEndereco.querySelector("select");
  const cepInput = document.getElementById("cep");
  const campoErrosNovoEndereco = document.getElementById("erros-novo-endereco");
  const campoErroSelecioneEndereco = document.getElementById(
    "erro-selecione-endereco"
  );
  let cepFormatado = "";

  async function buscaCep(cep) {
    const dadosCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
      (resposta) => {
        return resposta.json();
      }
    );
    return dadosCep;
  }

  async function onPreenchimentoCep() {
    if (cepInput.value.length < 8) return;
    const dadosDoCep = await buscaCep(cepInput.value);

    if (dadosDoCep.erro != true) {
      preencheCamposEndereco(dadosDoCep);
    }
  }

  function preencheCamposEndereco(informacoes) {
    const { bairro, localidade, logradouro, uf } = informacoes;
    document.getElementById("endereco").value = logradouro;
    document.getElementById("bairro").value = bairro;
    document.getElementById("cidade").value = localidade;
    document.getElementById("estado").value = uf;
  }

  function validaCampos(dados) {
    const erros = [];
    for (let i = 0; i < dados.length - 1; i++) {
      // Deixa o nome do campo com primeira letra maiuscula
      const nomeCampoFormatado =
        dados[i].name[0].toUpperCase() + dados[i].name.substr(1);

      const valorCampo = dados[i].value;
      const nomeCampo = dados[i].name;

      if (dados[i].value == "" && dados[i].name !== "complemento") {
        erros.push(`O campo ${nomeCampoFormatado} deve ser preenchido`);
      } else {
        // Caso os campos obrigatórios estejam preenchidos, faz uma checagem mais fina

        if (valorCampo.length !== 9 && nomeCampo == "cep") {
          erros.push("O Cep deve conter 8 dígitos");
        }

        if (valorCampo.length !== 2 && nomeCampo == "estado") {
          erros.push("Digite um estado válido");
        }
      }
    }
    return erros;
  }

  function mostraErrosNaTela(erros) {
    campoErrosNovoEndereco.style.display = "block";
    for (let erro of erros) {
      const elementoErro = document.createElement("li");
      elementoErro.innerHTML = erro;
      campoErrosNovoEndereco.appendChild(elementoErro);
    }
  }

  function onFormSubmit(evento) {
    evento.preventDefault();
    campoErrosNovoEndereco.innerHTML = "";
    campoErrosNovoEndereco.style.display = "none";
    const camposInvalidos = validaCampos(this.elements);

    if (camposInvalidos.length > 0) {
      mostraErrosNaTela(camposInvalidos);
    } else {
      window.location.href = "/checkoutPagamento";
    }
  }

  function onSelectEnderecoSubmit(evento) {
    evento.preventDefault();
    if (selectEndereco.value == "") {
      campoErroSelecioneEndereco.style.display = "block";
      campoErroSelecioneEndereco.innerHTML = `<li>Selecione um endereço para continuar</li>`;
    } else {
      window.location.href = "/checkoutPagamento";
    }
  }

  function onCepKeyup(evento) {
    // Adiciona mascara de input
    cepInput.value = cepInput.value.replace(/\D/g, "");
    cepFormatado = cepInput.value.replace(/^(\d{5})(\d)/, "$1-$2");
    cepInput.value = cepFormatado;
  }

  function onClickSelectEndereco() {
    // Remove erro de endereço quando usuário clica em um válido
    if (selectEndereco.value !== "") {
      campoErroSelecioneEndereco.style.display = "none";
      campoErroSelecioneEndereco.innerHTML = "";
    }
  }

  formNovoEndereco.addEventListener("submit", onFormSubmit);
  selectEndereco.addEventListener("click", onClickSelectEndereco);
  formSelectEndereco.addEventListener("submit", onSelectEnderecoSubmit);
  cepInput.addEventListener("blur", onPreenchimentoCep);
  cepInput.addEventListener("keyup", onCepKeyup);
});
