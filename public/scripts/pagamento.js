window.addEventListener('load', function () {

    let reservationform = document.querySelector('form.reservada')

    reservationform.addEventListener('submit', function (event) {
        event.preventDefault();
       
        let errorsMessagens = [];


        let fieldName = document.getElementById("nome")

        if (fieldName.value == '') {
            errorsMessagens.push('o campo nome nao pode estar vazio')
        } else if (fieldName.value.length < 3) {
            errorsMessagens.push("Nome precisa ser maior")
        }

        let fieldNumero = document.getElementById('Numero')
        if (fieldNumero.value == '') {
            errorsMessagens.push('Campo cartao esta vazio')

        }

        let fieldMes = document.getElementById('mes')
        if (fieldMes.value == '') {
            errorsMessagens.push('Campo mes  esta vazio')

        }

        let fieldAno = document.getElementById('ano')
        if (fieldAno.value == '') {
            errorsMessagens.push('Campo ano esta vazio')
        }

        let fieldCvv = document.getElementById("cvv")
        if (fieldCvv.value == '') {
            errorsMessagens.push('Campo cvv esta vazio ')
        }

        if (errorsMessagens > 0) {
           
            event.preventDefault();

            let divErrors = document.getElementById('div-errors');
            divErrors.classList.remove('no-errors');
            divErrors.classList.add('errors');

            let ulErrors = document.querySelector('div.errors ul');
            for (let i = 0; i < errorsMessagens.length; i++) {
                ulErrors.innerHTML += '<li>' + errorsMessagens[i] + '</li>'
            }
        }
    })
})

