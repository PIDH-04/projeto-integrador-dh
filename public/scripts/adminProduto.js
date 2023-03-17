window.addEventListener('load', () => {
    const campoPreview = document.getElementById('preview-img')
    const imgsContainer = document.querySelector('.imgs-produto')
    const inputImg = document.getElementById('img')
    
    function mostraImagemPreview(e){
        console.log(e.target.files.length)
        if(e.target.files.length > 0){
            let src = URL.createObjectURL(event.target.files[0])
            campoPreview.src = src;

            for(let i = 0; i < e.target.files.length; i++){
                const src = URL.createObjectURL(e.target.files[i]);
                imgsContainer.innerHTML += `<img src=${src} />`
            }
        }
    }

    inputImg.addEventListener('change', mostraImagemPreview)

})