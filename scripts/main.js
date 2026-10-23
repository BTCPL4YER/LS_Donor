document.addEventListener('DOMContentLoaded', function() {
    // Example animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 500);
});

// Example message on leaving the page
window.addEventListener('beforeunload', function(event) {
    event.preventDefault();
    event.returnValue = '';
});
