window.addEventListener("load", () => {
  const formNovoEndereco = document.getElementById("form-novo-endereco");
  const cepInput = document.getElementById("cep");
  const campoErros = document.getElementById("erros");
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
          erros.push("O Cpf deve conter 8 dígitos");
        }

        if (valorCampo.length !== 2 && nomeCampo == "estado") {
          erros.push("Digite um estado válido");
        }
      }
    }
    return erros;
  }

  function mostraErrosNaTela(erros) {
    campoErros.style.display = "block";
    for (let erro of erros) {
      const elementoErro = document.createElement("li");
      elementoErro.innerHTML = erro;
      campoErros.appendChild(elementoErro);
    }
  }

  function onFormSubmit(evento) {
    evento.preventDefault();
    campoErros.innerHTML = "";
    campoErros.style.display = "none";
    const camposInvalidos = validaCampos(this.elements);

    if (camposInvalidos.length > 0) {
      mostraErrosNaTela(camposInvalidos);
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

  formNovoEndereco.addEventListener("submit", onFormSubmit);
  cepInput.addEventListener("blur", onPreenchimentoCep);
  cepInput.addEventListener("keyup", onCepKeyup);
});
