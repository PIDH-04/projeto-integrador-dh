window.addEventListener('load', () => {
    localStorage.removeItem('produtos')
    function atualizaQuantidadeHeader() {
        const quantidadeDeProdutos = document.getElementById("span");
        quantidadeDeProdutos.innerText = 0;
      }
})