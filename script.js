const envelope = document.querySelector('.envelope');
const kuromi = document.querySelector('.kuromi-ringring');
let timeoutId;

envelope.addEventListener('mouseover', () => {
    clearTimeout(timeoutId);
    kuromi.style.opacity = 0;
});

envelope.addEventListener('mouseout', () => {
    timeoutId = setTimeout(() => {
        kuromi.style.opacity = 1;
    }, 1500); 
});

kuromi.style.transition = 'opacity 0.3s ease';