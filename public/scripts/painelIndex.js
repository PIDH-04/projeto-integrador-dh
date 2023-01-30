//formulario painel 
const formulario = document.getElementById('form')
const nameInput = document.getElementById('nome')
const emailInput = document.getElementById('email')
const senhaInput = document.getElementById('password')

window.addEventListener('load', function () {

   formulario.addEventListener('submit', function (event) {
      event.preventDefault();

      console.log("enviado")

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
      console.log(erros)


      if (erros.length > 0) {

         event.preventDefault();

         let divErrors = document.getElementById('div-errors');
         // divErrors.style.display = "none"
         divErrors.classList.remove('no-errors');
         divErrors.classList.add('errors');

         let ulErrors = document.querySelector('div.errors ul');
         for (let i = 0; i < erros.length; i++) {
            ulErrors.innerHTML += '<li>' + erros[i] + '</li>'
         }
      }


   })
})




//let formulario = document.getElementById('form')