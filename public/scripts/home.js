window.addEventListener('load', function(){
    let slides = document.querySelectorAll('.slides');
let home = 0;

function next(){
    slides[home].classList.remove('active');
    home = (home + 1) % slides.length;
    slides[home].classList.add('active');
}

function prev(){
    slides[home].classList.remove('active');
    home = (home - 1 + slides.length) % slides.length;
    slides[home].classList.add('active');
}

setInterval (next, 3000);
})
