window.addEventListener('load', function () {
   const formulario = document.getElementById('form-dados')
   let divErrors = document.getElementById('div-errors');
   let ulErrors = document.querySelector('#div-errors ul');
   const mensagemSucesso = document.querySelector('span.success');
   
   formulario.addEventListener('submit', function (event) {
      // mensagemSucesso.style.display = 'none';
      divErrors.classList.add("no-errors");
      ulErrors.innerHTML = ""
      
      let erros = []
      let nameInput = document.getElementById('nome')
      if (nameInput.value == "") {
         erros.push('o campo nome não podem estar vazio');
         console.log("erro no nome")
      }
      if (nameInput.value.length < 3) {
         erros.push('o campo nome tem que ser maior que 3')
      }
      let emailInput = document.getElementById('email')
      if (emailInput.value.length < 3) {
         erros.push('o campo e-mail tem que ser maior que 3');
      }
      let senhaInput = document.getElementById('password')
      let confirmacaoSenha = document.getElementById('password2')

      if (senhaInput.value.length > 0) {
         if(senhaInput.value.length < 3){
            erros.push('o campo senha tem que ser maior que 3');
         }else if (confirmacaoSenha.value != senhaInput.value) {
            erros.push('senhas não conferem, digite novamente')
         }
      }
      
      console.log(erros)


      if (erros.length > 0) {

         event.preventDefault();

         // divErrors.style.display = "none"
         divErrors.classList.remove('no-errors');
         divErrors.classList.add('errors');

         for (let i = 0; i < erros.length; i++) {
            ulErrors.innerHTML += '<li>' + erros[i] + '</li>'
         }
      }
   })
})




//let formulario = document.getElementById('form')