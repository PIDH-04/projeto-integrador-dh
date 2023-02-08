//formulario painel 
const formulario = document.getElementById('form')
const nameInput = document.getElementById('nome')
const emailInput = document.getElementById('email')
const senhaInput = document.getElementById('password')
const endereco = document.getElementById('Endereço')

window.addEventListener('load', function () {
   let divErrors = document.getElementById('div-errors');
   let ulErrors = document.querySelector('#div-errors ul');
   const mensagemSucesso = document.querySelector('span.success');
   formulario.addEventListener('submit', function (event) {
      event.preventDefault();
      mensagemSucesso.style.display = 'none';
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
      if (senhaInput.value.length < 3) {
         erros.push('o campo senha tem que ser maior que 3');
      }
      else if (password2.value != senhaInput.value) {
         erros.push('senhas não conferem, digite novamente')


      }



      if (erros.length > 0) {

         event.preventDefault();

         // divErrors.style.display = "none"
         divErrors.classList.remove('no-errors');
         divErrors.classList.add('errors');

         for (let i = 0; i < erros.length; i++) {
            ulErrors.innerHTML += '<li>' + erros[i] + '</li>'
         }
      }else{
         mensagemSucesso.style.display = 'block'
      }


   })
})




//let formulario = document.getElementById('form')