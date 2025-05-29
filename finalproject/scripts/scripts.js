// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
});

// Close menu when clicking a link (optional)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Form Submission with Validation
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked
    };
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In production: Send to server
    console.log('Form submitted:', formData);
    
    // Show success message
    const form = e.target;
    form.innerHTML = `
        <div class="form-success">
            <h3>🎉 Thanks for your message!</h3>
            <p>We'll get back to you soon.</p>
            <p>Check your inbox for a confirmation.</p>
        </div>
    `;
    
    // Reset form after submission (optional)
    setTimeout(() => {
        form.reset();
        form.innerHTML = `
            <h2>Send Another Message</h2>
            <!-- Original form HTML here -->
        `;
    }, 5000);
});

document.getElementById("currentyear").textContent = new Date().getFullYear();


// API Configuration (Shared with events page)
const API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const API_KEY = 'qqlE8YcUVgvqh4ksiNCgoQw4fRVOHpfc'; // Replace with your actual key

// DOM Elements
const featuredContainer = document.getElementById('featuredEvents');
const upcomingContainer = document.getElementById('upcomingEvents'); // For events.html

// Shared Event Display Functions
function createEventCard(event) {
    const eventDate = event.dates.start.localDate
        ? new Date(event.dates.start.localDate).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        })
        : 'Date TBD';

    const venue = event._embedded?.venues?.[0]?.name || 'Venue TBD';
    const image = event.images?.find(img => img.width > 600)?.url || 'placeholder-image.jpg';

    return `
        <div class="event-card">
            <img src="${image}" alt="${event.name}" loading="lazy">
            <div class="event-info">
                <h3>${event.name}</h3>
                <p class="event-meta">
                    <span class="date">${eventDate}</span>
                    <span class="venue">@ ${venue}</span>
                </p>
                ${event.url ? `<a href="${event.url}" target="_blank" class="cta-button">Get Tickets</a>` : ''}
            </div>
        </div>
    `;
}

// Homepage-Specific: Fetch Featured Events
async function fetchFeaturedEvents() {
    try {
        featuredContainer.innerHTML = '<p class="loading">Loading featured events...</p>';
        
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&keyword=music&sort=date,asc&size=3`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        if (data._embedded?.events) {
            featuredContainer.innerHTML = data._embedded.events
                .map(event => createEventCard(event))
                .join('');
        } else {
            featuredContainer.innerHTML = getFallbackEvents().slice(0, 3);
        }
    } catch (error) {
        console.error("Error fetching featured events:", error);
        featuredContainer.innerHTML = getFallbackEvents().slice(0, 3);
    }
}

// Shared Fallback Events
function getFallbackEvents() {
    const fallbackEvents = [
        {
            name: "Friday Jazz Night",
            dates: { start: { localDate: "2024-06-14" } },
            _embedded: { venues: [{ name: "Main Stage" }] },
            images: [{ url: "images/jazz-night.jpg", width: 800 }]
        },
        {
            name: "Indie Showcase",
            dates: { start: { localDate: "2024-06-21" } },
            _embedded: { venues: [{ name: "Outdoor Patio" }] },
            images: [{ url: "images/indie-showcase.jpg", width: 800 }]
        }
    ];
    
    return fallbackEvents.map(event => createEventCard(event));
}

// Initialize Based on Page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('featuredEvents')) {
        fetchFeaturedEvents(); // Homepage
    }
    if (document.getElementById('upcomingEvents')) {
        fetchEvents(); // Events page (from previous code)
    }
});


//elements of the events page
// DOM Elements
const eventsContainer = document.getElementById('upcomingEvents');

// Fetch Events from API
async function fetchEvents() {
    try {
        // Show loading state
        eventsContainer.innerHTML = '<p class="loading">Loading events...</p>';
        
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&keyword=music&city=Austin&size=10`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if events exist in response
        if (data._embedded && data._embedded.events) {
            displayEvents(data._embedded.events);
        } else {
            displayNoEvents();
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        displayError();
    }
}

// Display Events
function displayEvents(events) {
    eventsContainer.innerHTML = ''; // Clear loading/error messages
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        // Format date
        const eventDate = event.dates.start.localDate
            ? new Date(event.dates.start.localDate).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            })
            : 'Date TBD';
        
        // Get venue name
        const venue = event._embedded?.venues?.[0]?.name || 'Venue TBD';
        
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p class="event-date">${eventDate}</p>
            <p class="event-venue">@ ${venue}</p>
            ${event.url ? `<a href="${event.url}" target="_blank" class="cta-button">Get Tickets</a>` : ''}
        `;
        
        eventsContainer.appendChild(eventCard);
    });
}

// Error States
function displayNoEvents() {
    eventsContainer.innerHTML = `
        <div class="no-events">
            <p>No upcoming events found.</p>
            <p>Check back soon or follow us on social media!</p>
        </div>
    `;
}

function displayError() {
    eventsContainer.innerHTML = `
        <div class="error-message">
            <p>We're having trouble loading events.</p>
            <p>Here are some upcoming shows we're excited about:</p>
            ${getFallbackEvents()}
        </div>
    `;
}

// Fallback Events (if API fails)
function getFallbackEvents() {
    const fallbackEvents = [
        {
            name: "Local Jazz Night",
            date: "June 15, 2024",
            venue: "Main Stage"
        },
        {
            name: "Indie Band Showcase",
            date: "June 22, 2024",
            venue: "Outdoor Patio"
        }
    ];
    
    return fallbackEvents.map(event => `
        <div class="event-card">
            <h3>${event.name}</h3>
            <p class="event-date">${event.date}</p>
            <p class="event-venue">@ ${event.venue}</p>
        </div>
    `).join('');
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', fetchEvents);