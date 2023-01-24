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
      erros.push('o campo nome não podem estar vazio');
   }
   if (nameInput.value.length < 3) {
      erros.push('o campo name tem que ser maior que 3')
   }
   let emailInput = document.getElementById('email')
   if (emailInput.value.length < 3) {
      erros.push('o campo e-mail tem que ser maior que 3');
   }
   let senhaInput = document.getElementById('password')
   if (senhaInput.value.length < 3) {
      erros.push('o campo senha tem que ser maior que 3');
   }
   console.log(erros)

})

    //console.log("agora vai")
    //<script>
    // const form = document.getElementById('form');
    // const campos = document.querySelectorAll('.required')
    // const spans = document.querySelectorAll('.span-required')
    // const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

    // function nameValidate() {
    //   if (campos[0].value.length < 3){
    //     console.log('O nome deve ter no minimo 3 caracteres')
    //   }
    //   else
    //   {
    //     console.log('validando')
    //   }
    // }
  //</script>