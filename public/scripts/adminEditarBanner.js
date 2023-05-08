window.addEventListener('load', () => {
    const form = document.getElementById('novo-produto-form')
    const campoNome = document.getElementById('nome')
    const erro = document.querySelector('.erro-nome')

    function handleSubmit(e){
        if(campoNome.value == ''){
            erro.innerText = 'O nome deve ser preenchido'
            e.preventDefault()
        }
    }

    form.addEventListener('submit', handleSubmit )
})