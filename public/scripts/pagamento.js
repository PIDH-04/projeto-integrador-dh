window.addEventListener('load', function () {

    let reservationform = document.querySelector('form.reservada')

    reservationform.addEventListener("submit", function (event) {
        event.preventDefault();

        let fieldName = document.getElementById("nome")

        if (fieldName.value == "") {
            alert('o campo nome nao pode estar vazio')
        } else if (fieldName.value.length < 3) {
            alert("mome precisa ser maior")
        }

        let fieldNumero = document.getElementById("Numero")
        if (fieldNumero.value == "") {
            alert('campo cartao esta vazio')

        }

        let fieldMes = document.getElementById("mes")
        console.log(fieldMes)
        if (fieldMes.value == "") {
            alert('campo mes  esta vazio')

        }
    })
})


