const topo = document.querySelector('.topo-da-pg');

window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topo.style.display = "block";
  } else {
    topo.style.display = "none";
  }
};

topo.addEventListener("click", function() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE e Opera
});
