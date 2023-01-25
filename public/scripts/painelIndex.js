//formulario painel 
const formulario = document.getElementById('form')
const nameInput = document.getElementById('nome')
const emailInput = document.getElementById('email')
const senhaInput = document.getElementById('password')


formulario.addEventListener('submit', function (event) {
   event.preventDefault();

   let erros = []
   let nameInput = document.getElementById('nome')
   if (nameInput.value == "") {
      alert('o campo nome não podem estar vazio');
   }
   if (nameInput.value.length < 3) {
      alert('o campo nome tem que ser maior que 3')
   }
   let emailInput = document.getElementById('email')
   if (emailInput.value.length < 3) {
      alert('o campo e-mail tem que ser maior que 3');
   }
   let senhaInput = document.getElementById('password')
   if (senhaInput.value.length < 3) {
      alert('o campo senha tem que ser maior que 3');
   }
   else if (password2.value != senhaInput.value) {
   alert('senhas não conferem, digite novamente')
}
   console.log(erros)

})