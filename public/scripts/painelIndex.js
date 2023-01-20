//formulario painel 
    const formulario = document.getElementById('formulario')
    const nameInput = document.getElementById('nome')
    const emailInput = document.getElementById('email')
    const senhaInput = document.getElementById('password')
  
    formulario.addEventListener('submit', function(event){
        event.preventDefault();

        let dadosFormulario = document.getElementById('formulario')
        if (dadosFormulario[i].value == ""){
           erros.push('o campo não podem estar vazio');
        } else if(dadosFrom.value.lenght < 3){
            erros.push('o campo tem que ser maior que 3')
        };
        let nameInput = document.getElementById('nome')
        if (nameInput.value == ""){
           erros.push('o campo nome não podem estar vazio');
        }
        let dadosEmail = document.getElementById('email')
        if (dadosEmail.value == ""){
           erros.push('o campo e-mail não podem estar vazio');
        }
        let dadosSenha = document.getElementById('password')
        if (dadosSenha.value == ""){
           erros.push('o campo senha não podem estar vazio');
        }
    
    })

    console.log("agora vai")




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