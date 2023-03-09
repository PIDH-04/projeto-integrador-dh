const produtos = require('../databases/Produtos.json');
const filtroAreaInterna = document.querySelector('#filtroAreaInterna');
const filtroAreaExterna = document.querySelector('#filtroAreaExterna');
const qtdProdutos = document.querySelector('#qtdProdutos');
const produtos = document.querySelector('.produtos');

filtroAreaInterna.addEventListener('change', atualizarProdutos);
filtroAreaExterna.addEventListener('change', atualizarProdutos);

function atualizarProdutos() {
    const produtosExibidos = [];
  
    for (let i = 0; i < Produtos.length; i++) {
      const produto = Produtos[i];
  
      if ((filtroAreaInterna.checked && produto.area === 'interna') ||
          (filtroAreaExterna.checked && produto.area === 'externa')) {
        produtosExibidos.push(produto);
      }
    }
  
    exibirProdutos(produtosExibidos);
  }
  
  function exibirProdutos(produtosExibidos) {
      produtos.innerHTML = '';
    
      for (let i = 0; i < produtosExibidos.length; i++) {
        const produto = produtosExibidos[i];
    
        const divProduto = document.createElement('div');
        divProduto.id = 'produto';
    
        // Crie o restante do HTML para exibir as informações do produto
    
        produtos.appendChild(divProduto);
      }
    
      qtdProdutos.textContent = produtosExibidos.length;
    }
    atualizarProdutos();
