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




          
  
    
    
    if (nomeInput.value == ' ') {
      erros.push('o campo nome não pode estar vazio')
      
      
    } else if(nomeInput.value.length < 5){
      erros.push('o campo nome deve ter mais de 5 caracterer')
    }


  


    if (adressInput.value =='') {
      erros.push('o campo endereço nao pode estar vazio')

     } else if(adressInput.value.length < 3){
      erros.push('o campo endereço deve ter mais de 5 caracterer')
    }


     if (apartmentInput.value == '') {
       alert('opcional')

      }

    
      if (cityInput.value.length < 5) {
        erros.push('cidade incorreta! verifique o campo Cidade ')

     }

    //  if (estadoInput.value.length < 2 ) {
    //   erros.push('Estado incorreto! Verifique campo Estado')

    //  } 
     


    //  if (cepInput.value.length < 8  ) {
    //     erros.push('Cep incorreto')
        

    //   }
     
      if(erros.length  >  0 ){
          
      }
      
      

      console.log(erros);
    

    console.log('projeto')

    this.reset();

  })

})

