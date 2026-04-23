/* =====================================================
   American Corner Mtaani - Main JavaScript
   Kenya National Library Service, Nairobi
   ===================================================== */

// =====================================================
// Configuration - Update these URLs with your actual Google Form URLs
// =====================================================
// =====================================================
// Configuration - Update these URLs with your actual Google Form URLs
// =====================================================
// =====================================================
// Configuration - Update these URLs with your actual Google Form URLs
// =====================================================
const FORM_URLS = {
    signIn: "https://docs.google.com/forms/d/e/1FAIpQLScyJrGQjMwthJAHWB2cb7CgKce8sgw6DhwbJvr_R7n_zorhcA/viewform?usp=sf_link",
    studyUSA: "https://docs.google.com/forms/d/e/YOUR_STUDYUSA_FORM_ID/viewform",
    englishClasses: "https://docs.google.com/forms/d/e/YOUR_ENGLISH_FORM_ID/viewform",
    programs: "https://docs.google.com/forms/d/19Vy74GI68ibyHoO0j8MrRng9MgQrbWC89ukxdyRWx1s/preview",
    attendance: "https://docs.google.com/forms/d/1izqLJV0DEJhmOv2ATW3NjBNV9TTIz3hAbNGG4ROVbS8/preview",
    feedback: "https://docs.google.com/forms/d/e/1FAIpQLScH6nT4k8ASch8slJOvTqgsD59NblRcJ5XfMYtyQCrDCPCjQw/viewform",
    request: "https://docs.google.com/forms/d/1nNl6vDeOheQKtZMH1lbmoCuysHbRIYggL1AS-c2mneQ/preview",
    volunteer: "https://docs.google.com/forms/d/1iI5v0dLyxGY_SzRtfdBHTu43JORBHlUZZmMtf6TeMws/preview"
};

// =====================================================
// Events Data - Update this array with your actual events
// =====================================================
const eventsData = [
    {
        id: 1,
        title: "FREE Business & Entrepreneurship Training",
        date: "2026-01-31",
        month: "JAN",
        day: "31",
        time: "9:00 AM - 4:00 PM",
        location: "KNLS Upper Hill, Nairobi",
        description: "Learn practical skills in Business Planning, Business Model Canvas, Customer Management & Growth Hacking. Get a mentorship certificate & job opportunities! KNLS in partnership with BrighterMonday Kenya.",
        category: "Entrepreneurship",
        rsvpUrl: "https://docs.google.com/forms/d/19Vy74GI68ibyHoO0j8MrRng9MgQrbWC89ukxdyRWx1s/preview"
    }
];

// =====================================================
// DOM Elements
// =====================================================
const eventsModal = document.getElementById('eventsModal');
const contactModal = document.getElementById('contactModal');
const eventsContainer = document.getElementById('eventsContainer');

// =====================================================
// Navigation Functions
// =====================================================

/**
 * Navigate to a Google Form based on the form type
 * @param {string} formType - The type of form to navigate to
 */
function navigateToForm(formType) {
    const url = FORM_URLS[formType];
    if (url) {
        // Add a subtle animation feedback
        showNavigatingFeedback();
        
        // Open in new tab for better UX on tablets
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        console.warn(`Form URL not found for: ${formType}`);
        alert('This form is being set up. Please check back soon!');
    }
}

/**
 * Navigate to an event's RSVP form
 * @param {string} url - The RSVP form URL
 */
function navigateToEventRSVP(url) {
    if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

/**
 * Show a brief visual feedback when navigating
 */
function showNavigatingFeedback() {
    // You could add a loading overlay or toast notification here
    console.log('Navigating to form...');
}

// =====================================================
// Modal Functions
// =====================================================

/**
 * Open the events modal and render events
 */
function openEventsModal() {
    renderEvents();
    eventsModal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Focus trap - focus the close button
    const closeBtn = eventsModal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.focus();
    }
    
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Close the events modal
 */
function closeEventsModal() {
    eventsModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscapeKey);
}

/**
 * Open the contact modal
 */
function openContactModal() {
    contactModal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Focus trap
    const closeBtn = contactModal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.focus();
    }
    
    document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Close the contact modal
 */
function closeContactModal() {
    contactModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscapeKey);
}

/**
 * Close modal when clicking on overlay (outside modal content)
 * @param {Event} event - Click event
 */
function closeModalOnOverlay(event) {
    if (event.target.classList.contains('modal-overlay')) {
        if (eventsModal.classList.contains('active')) {
            closeEventsModal();
        }
        if (contactModal.classList.contains('active')) {
            closeContactModal();
        }
    }
}

/**
 * Handle escape key to close modals
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeEventsModal();
        closeContactModal();
    }
}

// =====================================================
// Events Rendering
// =====================================================

/**
 * Render all events in the modal
 */
function renderEvents() {
    // Filter to show only upcoming events
    const upcomingEvents = filterUpcomingEvents(eventsData);
    
    if (upcomingEvents.length === 0) {
        eventsContainer.innerHTML = `
            <div class="no-events">
                <i class="fa-solid fa-calendar-xmark" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 16px;"></i>
                <h3 style="color: var(--text-secondary);">No Upcoming Events</h3>
                <p style="color: var(--text-light);">Check back soon for new events!</p>
            </div>
        `;
        return;
    }
    
    const eventsHTML = upcomingEvents.map(event => createEventCard(event)).join('');
    eventsContainer.innerHTML = eventsHTML;
}

/**
 * Filter events to show only upcoming ones
 * @param {Array} events - Array of event objects
 * @returns {Array} - Filtered array of upcoming events
 */
function filterUpcomingEvents(events) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Create HTML for a single event card
 * @param {Object} event - Event object
 * @returns {string} - HTML string for the event card
 */
function createEventCard(event) {
    return `
        <div class="event-card">
            <div class="event-header">
                <div class="event-date-box">
                    <span class="month">${event.month}</span>
                    <span class="day">${event.day}</span>
                </div>
                <div class="event-info">
                    <h4>${escapeHtml(event.title)}</h4>
                    <p class="event-time">
                        <i class="fa-regular fa-clock"></i>
                        ${escapeHtml(event.time)}
                    </p>
                </div>
            </div>
            <span class="event-category">${escapeHtml(event.category)}</span>
            <p class="event-description">${escapeHtml(event.description)}</p>
            <button class="event-rsvp-btn" onclick="navigateToEventRSVP('${event.rsvpUrl}')">
                RSVP Now
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    `;
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =====================================================
// Card Interaction Handlers
// =====================================================

/**
 * Handle keyboard navigation for cards
 */
function setupCardKeyboardNavigation() {
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.click();
            }
        });
    });
}

// =====================================================
// Header Scroll Effect
// =====================================================

/**
 * Add shadow to header on scroll
 */
function setupHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// =====================================================
// Touch Device Optimizations
// =====================================================

/**
 * Detect if device supports touch
 * @returns {boolean}
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Setup touch optimizations for cards
 */
function setupTouchOptimizations() {
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        
        // Add active state feedback for touch
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            card.addEventListener('touchend', () => {
                card.style.transform = '';
            }, { passive: true });
        });
    }
}

// =====================================================
// Service Worker Registration (for offline support - optional)
// =====================================================

/**
 * Register service worker for offline capabilities
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        });
    }
}

// =====================================================
// Initialization
// =====================================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    console.log('American Corner Mtaani Dashboard Initialized');
    
    // Setup keyboard navigation
    setupCardKeyboardNavigation();
    
    // Setup header scroll effect
    setupHeaderScroll();
    
    // Setup touch optimizations
    setupTouchOptimizations();
    
    // Log current date for debugging
    console.log('Current Date:', new Date().toLocaleDateString());
    console.log('Upcoming Events:', filterUpcomingEvents(eventsData).length);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// =====================================================
// Utility Functions for Admin Use
// =====================================================

/**
 * Add a new event (for console use by admins)
 * @param {Object} eventData - New event data
 */
window.addEvent = function(eventData) {
    const requiredFields = ['title', 'date', 'month', 'day', 'time', 'description', 'category', 'rsvpUrl'];
    const missingFields = requiredFields.filter(field => !eventData[field]);
    
    if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        return false;
    }
    
    eventData.id = eventsData.length + 1;
    eventsData.push(eventData);
    console.log('Event added successfully:', eventData.title);
    return true;
};

/**
 * List all events (for console use)
 */
window.listEvents = function() {
    console.table(eventsData.map(e => ({
        ID: e.id,
        Title: e.title,
        Date: e.date,
        Time: e.time,
        Category: e.category
    })));
};




/**
 * Update form URLs (for console use)
 * @param {string} formType - Type of form
 * @param {string} url - New URL
 */
window.updateFormUrl = function(formType, url) {
    if (FORM_URLS.hasOwnProperty(formType)) {
        FORM_URLS[formType] = url;
        console.log(`Updated ${formType} URL to:`, url);
        return true;
    }
    console.error('Invalid form type. Available types:', Object.keys(FORM_URLS));
    return false;
};

// =====================================================
// Console Welcome Message
// =====================================================
console.log('%c American Corner Mtaani ', 'background: #0a2240; color: white; font-size: 16px; padding: 8px 16px; border-radius: 4px;');
console.log('%c Dashboard v1.0.0 ', 'color: #2260a9; font-size: 12px;');
console.log('Need help? Contact: americancornermtaani@gmail.com');
// Staff Login Navigation (you can change the URL later)
function navigateToStaffLogin() {
    window.open("https://acmtaani-hub.lovable.com/", "_blank");
}

// Make sure mobile menu works with new structure
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    const toggle = document.getElementById('nav-toggle');
    
    if (nav && toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
});