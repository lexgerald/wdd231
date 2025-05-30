// Load attractions data and create cards
fetch('data/attractions.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('attractions-container');
        
        data.forEach((attraction, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.gridArea = `attraction${index + 1}`;
            
            card.innerHTML = `
                <h2>${attraction.name}</h2>
                <figure>
                    <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <button class="learn-more">Learn More</button>
            `;
            
            container.appendChild(card);
        });
    });

// Track visits
document.addEventListener('DOMContentLoaded', function() {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysBetween === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysBetween === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', currentVisit);
});