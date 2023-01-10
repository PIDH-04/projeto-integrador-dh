window.addEventListener('load', () => {
    const imgContainer = document.querySelector('.img-container');
    const modal = document.querySelector('.modal')
    const closeModalButton = modal.querySelector('span');

    imgContainer.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';

    })


    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    })


})