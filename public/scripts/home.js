window.addEventListener('load', function () {
    let slides = document.querySelectorAll('.slides');
    let home = 0;
    let prev = document.getElementById('prev');
    let next = document.getElementById('next')

    function nextAtual() {
        slides[home].classList.remove('active');
        home = (home + 1) % slides.length;
        slides[home].classList.add('active');
    }

    function prevAtual() {
        slides[home].classList.remove('active');
        home = (home - 1 + slides.length) % slides.length;
        slides[home].classList.add('active');
    }

    setInterval(nextAtual, 3000);

    prev.addEventListener('click', () => {
        prevAtual()
    })

    next.addEventListener('click', () => {
        nextAtual()
    })
})



