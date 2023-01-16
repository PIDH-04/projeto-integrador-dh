// window.addEventListener('load', () => {
//     const nomeInput = document.getElementById('#nome')
//     const adressIntpu = document.getElementById('#adress')
//     const apartmentInput = document.getElementById('#apartment')
//     const cityInput = document.getElementById('#city')
//     const cityOpcional = document.getElementById('#opcional')
//     const paisCadastro = document.getElementById('#validationtooltip03')
//     const estadoCadastro = document.getElementById('#validationtooltip05')

//     const errosCadastro = document.getElementById('errors')

//     const erros = []


//     nome.addEventListener('submit', function () {
//         if (nomeInput.value.length < 1) {
//             erros.push('nome input vazio')
//         }

//     })

//     adress.addEventListener('submit', function () {
//         if (adressInput.value.length < 1) {
//             erros.push('adress input vazio')
//         }

//     })

//     apartmentInput.addEventListener('submit', function () {
//         if (apartmentInput.value.length < 1) {
//             erros.push('apartament input vazio')
//         }

//     })

//     cityInput.addEventListener('submit', function () {
//         if (cityInput.value.length < 1) {
//             erros.push('city input vazio')
//         }

//     })

//     cityOpcional.addEventListener('submit', function () {
//         if (cityOpcionalInput.value.length < 1) {
//             erros.push('cityOpcioanl input vazio')
//         }

//     })

//     paisCadastro.addEventListener('submit', function () {
//         if (paisCadastroInput.value.length < 1) {
//             erros.push('paisCadastro input vazio')
//         }

//     })




//     btnEnviar.addEventListener("click", (e) => {
//         quantidade.value = parseInt(quantidade.value) + 1;
//       });



// })
window.addEventListener('load', () => {



  document.querySelector('form').addEventListener('submit', function (e) {

    e.preventDefault();

    const nomeInput = document.getElementById('Nome')
    const adressInput = document.getElementById('Adress')
    const apartmentInput = document.getElementById('Apartment')
    const cityInput = document.getElementById('City')
    const estadoInput = document.getElementById('Estado')
    const cepInput = document.getElementById('Cep')






    const errosCadastro = document.getElementById('errors')

    const erros = []




    
    


    if (nomeInput.value.length < 5) {
      erros.push('nome não pode estar vazio')

      
    }

    // if (nomeInput < 5) {
    //   erros.push('nome input vazio')

    // }

    // if (adressInput < 1) {
    //   erros.push('endereço input vazio')

    // }

    // if (apartmentInput < 1) {
    //   erros.push('opcional')

    // }

    // if (cityInput < 15) {
    //   erros.push('cidade input vazio')

    // }

    // if (estadoInput < 2) {
    //   erros.push('estado input vazio')

    // }

    // if (cepInput < 8) {
    //   erros.push('cep input vazio')


    // }






    

    console.log('projeto')

    this.reset();

  })

})

