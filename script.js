document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.transform = `scale(1.05) translate(${(x - rect.width / 2) / 10}px, ${(y - rect.height / 2) / 10}px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});
