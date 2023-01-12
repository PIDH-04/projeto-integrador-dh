window.addEventListener('load', () => {
    const nomeInput = document.getElementById('nome')
    const adressIntpu = document.getElementById('adress')
    const apartmentInput = document.getElementById('apartment')
    const cityInput = document.getElementById('city')
    const cityOpcional = document.getElementById('opcional')
    const paisCadastro = document.getElementById('validationtooltip03')
    const estadoCadastro = document.getElementById('validationtooltip05')

    const errosCadastro = document.getElementById('errors')

    const erros = []


    nome.addEventListener('submit', function () {
         if (nomeInput.value.length < 1) {
            erros.push('nome input vazio')
        }

    })

    adress.addEventListener('submit', function () {
         if (adressInput.value.length < 1) {
            erros.push('adress input vazio')
        }

    })


})