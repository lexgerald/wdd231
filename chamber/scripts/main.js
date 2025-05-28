// Main JavaScript for common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set footer year and last modified date
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
    
    // Mobile menu toggle
    const menuButton = document.getElementById('menu-button');
    const navigation = document.querySelector('.navigation');
    
    menuButton.addEventListener('click', function() {
        navigation.classList.toggle('show');
    });
});

// Set timestamp when page loads
document.getElementById('timestamp').value = new Date().toISOString();

// Modal functionality
document.querySelectorAll('.more-info').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('href');
        document.querySelector(modalId).style.display = 'block';
    });
});

document.querySelectorAll('.close').forEach(span => {
    span.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});