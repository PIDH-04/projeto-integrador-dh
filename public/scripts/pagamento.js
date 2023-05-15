window.addEventListener('load', function () {

    let reservationform = document.querySelector('form.reservada')
    let divErrors = document.getElementById('div-errors');
    let ulErrors = document.querySelector('#div-errors ul');
    let fieldNumero = document.getElementById('Numero')
    let produtos = document.getElementById('produtos')

    reservationform.addEventListener('submit', function (event) {
        divErrors.classList.add('no-errors');
        ulErrors.innerHTML = '' 

        let errorsMessagens = [];
        errorsMessagens.length = 0

        let fieldName = document.getElementById("nome")

        if (fieldName.value == '') {
            errorsMessagens.push('o campo nome nao pode estar vazio')
        } else if (fieldName.value.length < 3) {
            errorsMessagens.push("Nome precisa ter pelo menos 3 caracteres")
        }

        if (fieldNumero.value == '') {
            errorsMessagens.push('Campo cartao esta vazio')
         } else if(fieldNumero.value.length < 13 || fieldNumero.value.length > 15){
            errorsMessagens.push('A quantidade de dígitos do cartão está incorreta')
         }

        let fieldMes = document.getElementById('mes')
        if (fieldMes.value == '') {
            errorsMessagens.push('Campo mês esta vazio')
        } else if(fieldMes.value.length !== 2){
            errorsMessagens.push('O campo mês deve conter com 2 digitos')
        }

        let fieldAno = document.getElementById('ano')
        if (fieldAno.value == '') {
            errorsMessagens.push('Campo ano esta vazio')
        } else if(fieldAno.value.length !== 2){
            errorsMessagens.push('O campo ano deve conter 2 dígitos')
        }

        let fieldCvv = document.getElementById("cvv")
        if (fieldCvv.value == '') {
            errorsMessagens.push('Campo cvv esta vazio ')
        } else if(fieldCvv.value.length !== 3){
            errorsMessagens.push('O campo CVV deve conter 3 dígitos')
        }

        if (errorsMessagens.length > 0) {

            event.preventDefault();


            divErrors.classList.remove('no-errors');
            divErrors.classList.add('errors');

            for (let i = 0; i < errorsMessagens.length; i++) {
                ulErrors.innerHTML += '<li>' + errorsMessagens[i] + '</li>'
            }
        }

        const produtosNoCarrinho = localStorage.getItem('produtos')
        produtos.value = produtosNoCarrinho
    })
})

