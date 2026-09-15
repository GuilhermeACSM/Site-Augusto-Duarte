/* assets/js/skeleton.js */

document.addEventListener("DOMContentLoaded", () => {
    // In a static site, DOMContentLoaded means the HTML is ready.
    // However, to ensure a minimum display time for the skeleton effect (giving that premium app feel),
    // we wait for window.load (images/css ready) AND a minimum of 400ms.
    
    const minLoadingTime = 400; // milliseconds
    const startTime = Date.now();
    
    window.addEventListener('load', () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
            const skeletonContainer = document.getElementById('skeleton-container');
            const realContent = document.getElementById('conteudo-real');
            
            if (skeletonContainer && realContent) {
                // Hide skeleton
                skeletonContainer.style.display = 'none';
                
                // Show real content and trigger fade in
                realContent.style.display = 'block';
                // Small delay to allow browser to register display:block before transitioning opacity
                requestAnimationFrame(() => {
                    realContent.classList.add('loaded');
                    // Re-trigger AOS animations or any scroll-based observers if needed
                    if (window.AOS) {
                        window.AOS.refresh();
                    }
                });
            }
        }, remainingTime);
    });
});
