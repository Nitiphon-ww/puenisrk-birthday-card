const envelope = document.querySelector('.envelope');
const kuromi = document.querySelector('.kuromi-ringring');
const footer = document.querySelector('.card-footer');
let timeoutId;
let footerTimeoutId;
footer.style.opacity = 0;

envelope.addEventListener('mouseover', () => {
    clearTimeout(timeoutId);
    clearTimeout(footerTimeoutId);
    kuromi.style.opacity = 0;
    footerTimeoutId = setTimeout(() => {
        footer.style.opacity = 1;
    }, 1200);
    
});

envelope.addEventListener('mouseout', () => {
    timeoutId = setTimeout(() => {
        kuromi.style.opacity = 1;
    }, 1500);
    footer.style.opacity = 0;
});

kuromi.style.transition = 'opacity 0.3s ease';