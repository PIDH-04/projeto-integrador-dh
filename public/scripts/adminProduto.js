window.addEventListener('load', () => {
    const campoPreview = document.getElementById('preview-img')
    const inputImg = document.getElementById('img')
    
    function mostraImagemPreview(e){
        if(e.target.files.length > 0){
            let src = URL.createObjectURL(event.target.files[0])
            campoPreview.src = src;
        }
    }

    inputImg.addEventListener('change', mostraImagemPreview)

})