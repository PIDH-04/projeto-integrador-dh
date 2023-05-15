window.addEventListener('load', () => {
    const form = document.getElementById('novo-produto-form')
    const campoNome = document.getElementById('nome')
    const campoDescricao = document.getElementById('descricao')
    const campoImg = document.getElementById('img')
    const erroNome = document.querySelector('.erro-nome')
    const erroDescricao = document.querySelector('.erro-descricao')
    const erroImg = document.querySelector('.erro-img')


    form.addEventListener('submit', (e) => {
        erroNome.innerText = ''
        erroDescricao.innerText = ''
        erroImg.innerText = ''

        if(campoNome.value == ''){
            e.preventDefault()
            erroNome.innerText = 'O nome deve ser informado'
        }

        if(campoDescricao.value == ''){
            e.preventDefault()
            erroDescricao.innerText = 'A descrição deve ser informada'
        }

        if(campoImg.files.length == 0){
            e.preventDefault()
            erroImg.innerText = 'É necessário enviar uma imagem'
        }
        
    })
})