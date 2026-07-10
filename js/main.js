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
        date: "2026-07-09",
        month: "JUL",
        day: "09",
        time: "9:00 AM - 4:00 PM",
        location: "KNLS Upper Hill, Nairobi",
        description: "Learn practical skills in Business Planning, Business Model Canvas, Customer Management & Growth Hacking. Get a mentorship certificate & job opportunities! KNLS in partnership with BrighterMonday Kenya.",
        category: "Entrepreneurship",
        // Poster image - place this file in the same folder as index.html (or update path to match its actual location)
        image: "https://res.cloudinary.com/ygairs70/image/upload/v1783676730/tech_program_uwhovv.png",
        rsvpUrl: "https://forms.gle/9bu7kixT5fFNND"
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
 * Convert a Google Form URL into an embeddable version.
 * - "/viewform" links: add embedded=true so Google strips its own chrome.
 * - "/preview" links: these are owner-only edit-preview links and will
 *   NOT record real responses. We still embed them so they display,
 *   but flag it in the console — swap these for the real public
 *   "viewform" link from Google Forms > Send > Link.
 * @param {string} url
 * @returns {string}
 */
function toEmbeddableFormUrl(url) {
    if (!url) return url;

    if (url.includes('/preview')) {
        console.warn('This form URL is an owner-only preview link and will not save responses:', url);
    }

    if (url.includes('embedded=true')) {
        return url;
    }

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}embedded=true`;
}

/**
 * Open a form inline in the form modal (instead of a new tab)
 * @param {string} url - The form URL
 * @param {string} label - Friendly title shown in the modal header
 */
function openFormModal(url, label) {
    if (!url) {
        alert('This form is being set up. Please check back soon!');
        return;
    }

    const formModal = document.getElementById('formModal');
    const formIframe = document.getElementById('formIframe');
    const formTitleText = document.getElementById('formModalTitleText');
    const formLoading = document.getElementById('formLoading');

    formTitleText.textContent = label || 'Form';
    formLoading.classList.add('active');
    formIframe.classList.remove('loaded');
    formIframe.src = toEmbeddableFormUrl(url);

    formModal.classList.add('active');
    document.body.classList.add('modal-open');

    const closeBtn = formModal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();

    document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Close the form modal, reset the iframe, and land back on the homepage
 */
function closeFormModal() {
    const formModal = document.getElementById('formModal');
    const formIframe = document.getElementById('formIframe');

    formModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscapeKey);

    // Stop the iframe and clear it so a re-open always starts fresh
    formIframe.src = 'about:blank';

    // Land back on the homepage/dashboard section
    const homeSection = document.getElementById('events');
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Hide the loading spinner once the iframe content has loaded
 */
function handleFormIframeLoad() {
    const formIframe = document.getElementById('formIframe');
    const formLoading = document.getElementById('formLoading');
    if (formIframe.src === 'about:blank') return;
    formLoading.classList.remove('active');
    formIframe.classList.add('loaded');
}

/**
 * Friendly labels for each form type, shown in the modal header
 */
const FORM_LABELS = {
    signIn: 'AC Mtaani Sign In',
    studyUSA: 'Study USA',
    englishClasses: 'English Classes',
    programs: 'Upcoming Programs Sign Up',
    attendance: 'Program Attendance',
    feedback: 'Feedback',
    request: 'Request & Return',
    volunteer: 'Volunteer Sign Up'
};

/**
 * Navigate to a Google Form based on the form type
 * @param {string} formType - The type of form to navigate to
 */
function navigateToForm(formType) {
    const url = FORM_URLS[formType];
    if (url) {
        showNavigatingFeedback();
        openFormModal(url, FORM_LABELS[formType]);
    } else {
        console.warn(`Form URL not found for: ${formType}`);
        alert('This form is being set up. Please check back soon!');
    }
}

/**
 * Navigate to an event's RSVP form
 * @param {string} url - The RSVP form URL
 * @param {string} title - The event title, used as the modal header
 */
function navigateToEventRSVP(url, title) {
    if (url) {
        openFormModal(url, title ? `RSVP — ${title}` : 'RSVP');
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
        const formModal = document.getElementById('formModal');
        if (formModal && formModal.classList.contains('active')) {
            closeFormModal();
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
        const formModal = document.getElementById('formModal');
        if (formModal && formModal.classList.contains('active')) {
            closeFormModal();
        }
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
    return events.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Create HTML for a single event card
 * @param {Object} event - Event object
 * @returns {string} - HTML string for the event card
 */
function createEventCard(event) {
    const posterHTML = event.image ? `
            <div class="event-poster">
                <img src="${event.image}" alt="${escapeHtml(event.title)} poster" loading="lazy" />
            </div>` : '';

    return `
        <div class="event-card">
            ${posterHTML}
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
            <button class="event-rsvp-btn" onclick="navigateToEventRSVP('${event.rsvpUrl}', '${escapeHtml(event.title).replace(/'/g, "\\'")}')">
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
    window.open("https://acmtaanihub.lovable.app/auth/", "_blank");
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
