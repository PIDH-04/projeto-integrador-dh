const entregues = document.querySelector('.titulo1');
const andamento = document.querySelector('.titulo2');
const todos = document.querySelector('.titulo3');
const painel1 = document.querySelector('#entregues');
const painel2 = document.querySelector('#andamento');
const painel3 = document.querySelector('#todos');
const container = document.querySelector('.pedidos');
const paineis = document.querySelectorAll('.painel');
const titulos = document.querySelectorAll('#titulo');

for (let i = 0; i < titulos.length; i++) {
  titulos[i].addEventListener('click', function() {
    const painelClicked = paineis[i];
    for (let i = 0; i < paineis.length; i++) {
      if (paineis[i] !== painelClicked) {
        container.append(paineis[i]);
      }
    }
    container.insertBefore(painelClicked, container.firstChild);
  });
}

entregues.addEventListener('click', () => {
  painel2.classList.remove('active');
  painel3.classList.remove('active');
  painel1.classList.add('active');
});

andamento.addEventListener('click', () => {
  painel1.classList.remove('active');
  painel3.classList.remove('active');
  painel2.classList.add('active');
});

todos.addEventListener('click', () => {
  painel2.classList.remove('active');
  painel1.classList.remove('active');
  painel3.classList.add('active');
});
