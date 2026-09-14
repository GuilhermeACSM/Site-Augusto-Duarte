function removeSkeleton() {
  const overlay = document.getElementById('skeleton-overlay');
  if(overlay && !overlay.classList.contains('loaded')) {
    overlay.classList.add('loaded');
    setTimeout(() => {
      overlay.remove();
    }, 600);
  }
}

window.addEventListener('load', removeSkeleton);

document.addEventListener('DOMContentLoaded', function() {
  // Failsafe: força a remoção do esqueleto se a página demorar muito a carregar
  // (por exemplo, se o script do VLibras ou alguma imagem demorar a responder)
  setTimeout(removeSkeleton, 1000);
});
