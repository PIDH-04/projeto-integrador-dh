window.addEventListener('load', () => {
    const campoPreview = document.getElementById('preview-img')
    const imgsContainer = document.querySelector('.imgs-produto')
    const inputImg = document.getElementById('img')
    
    function mostraImagemPreview(e){
        if(e.target.files.length > 0){
            let src = URL.createObjectURL(event.target.files[0])
            campoPreview.src = src;
            
            if(window.location.pathname.includes('produtos')){
                for(let i = 0; i < e.target.files.length; i++){
                    const src = URL.createObjectURL(e.target.files[i]);
                    imgsContainer.innerHTML += `
                        <div class="miniatura-img-produto">
                            <span class="remover-img">X</span>
                            <img src="${src}" />
                        </div>
                  `
                }
            
                addEventListenerNasImagens()
            } 
        }
    }

    function addEventListenerNasImagens(){
        const imgs = imgsContainer.querySelectorAll('img')
        if(imgs.length > 0){
            for(let img of imgs){
                img.removeEventListener('click', mudaPreview)
                img.addEventListener('click', mudaPreview)
            }
        }
    }

    function mudaPreview(){
        campoPreview.src = this.src
    }

    if(window.location.pathname.includes('produtos')){
        addEventListenerNasImagens()
    }    
    inputImg.addEventListener('change', mostraImagemPreview)

})