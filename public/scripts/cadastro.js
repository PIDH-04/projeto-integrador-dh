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

    const nomeInput = document.getElementById('nome')
    const emailInput = document.getElementById('email')
    const senhaInput = document.getElementById('senha')
    const confirmarSenhaInput = document.getElementById('confirmarSenha')


    const email2Input = document.getElementById('Adress');
    const senha2Input = document.getElementById('Adress1');









    const errosCadastro = document.getElementById('errors')

    const erros = []








    if (nomeInput.value == ' ') {
      erros.push('o campo nome não pode estar vazio')


    } else if (nomeInput.value.length < 5) {
      erros.push('o campo nome deve ter mais de 5 caractereres')
    }





    if (emailInput.value == '') {
      erros.push('digite um email valido')

    } else if (emailInput.value.length < 5) {
      erros.push('Ex maria@gmail.com')
    }



    if (senhaInput.value == '') {
      erros.push('campo não pode estar vazio')

    } else if (senhaInput.value.length < 8) {
      erros.push('Senha com minimo de 8 caracteres')
    }


    if (confirmarSenhaInput.value.length == '') {
      erros.push('campo não pode estar vazio')

    } else if (confirmarSenhaInput.value.length != senhaInput.value.length) {
      erros.push('senha nao confere, digite novamente')
    }



    // if (email2Input.value.length == '') {
    //   erros.push('o campo nao pode estar vazio')
    // } 
    // else if (emailInput.value.length < 3) {
    //   erros.push('Ex maria@gmail.com')
    // }



    // if (senha2Input.value.length == '') {
    //   erros.push('o campo nao pode estar vazio')
    // } 
    // else if (senhaInput.value.length >= 8) {
    //   erros.push('Senha com minimo de 8 caracteres')
    // }




    if (erros.length > 0) {
      e.preventDefault();

    }

    let divErrors = document.getElementById('div-errors');
    divErrors.classList.remove('no-errors');
    divErrors.classList.add('errors')


    let ulErros = document.querySelector('div.errors ul');
    for (let i = 0; i < erros.length; i++) {
      ulErros.innerHTML += '<li>' + erros[i] + '</li>';
    }







    // console.log(erros);


    console.log('projeto')

    this.reset();

  })

})