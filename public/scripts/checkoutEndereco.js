window.addEventListener("load", () => {
  const formNovoEndereco = document.getElementById("form-novo-endereco");
  const cepInput = document.getElementById("cep");

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

    if (dadosDoCep.erros != true) {
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
  formNovoEndereco.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  cepInput.addEventListener("blur", onPreenchimentoCep);
});
