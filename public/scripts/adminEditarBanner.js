window.addEventListener('load', () => {
    const form = document.getElementById('novo-produto-form')
    const campoNome = document.getElementById('nome')
    const erroNome = document.querySelector('.erro-nome')
    const erroImg = document.querySelector('.erro-img')
    const img = document.getElementById('img')

    function handleSubmit(e){
        erroNome.innerText = ''
        erroImg.innerText = ''

        if(campoNome.value == ''){
            erroNome.innerText = 'O nome deve ser preenchido'
            e.preventDefault()
        }

        if(window.location.pathname.includes('criar')){
            if(img.files.length == 0){
                erroImg.innerText = 'A imagem deve ser selecionada'
                e.preventDefault()
            }
        }
    }

    form.addEventListener('submit', handleSubmit )
})