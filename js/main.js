/* =====================================================
   American Corner Mtaani - Main JavaScript
   Kenya National Library Service, Nairobi
   ===================================================== */

// =====================================================
// Configuration - Update these URLs with your actual Google Form URLs
// =====================================================
const FORM_URLS = {
    signIn: "https://docs.google.com/forms/d/e/1FAIpQLScyJrGQjMwthJAHWB2cb7CgKce8sgw6DhwbJvr_R7n_zorhcA/viewform?usp=sf_link",
    studyUSA: "https://docs.google.com/forms/d/e/YOUR_STUDYUSA_FORM_ID/viewform",
    englishClasses: "https://docs.google.com/forms/d/e/YOUR_ENGLISH_FORM_ID/viewform",
    programs: "https://forms.gle/9bu7kixT5fFNND",
    attendance: "https://forms.gle/9bu7kixT5fFNND",
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

    if (!formModal || !formIframe || !formTitleText || !formLoading) {
        console.error('Form modal elements are missing from the page. Opening form in a new tab instead.');
        window.open(url, '_blank');
        return;
    }

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
    if (!formModal || !formIframe) return;

    formModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscapeKey);

    formIframe.src = 'about:blank';

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
    if (!formIframe || !formLoading) return;
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
    console.log('Navigating to form...');
}

// =====================================================
// Modal Functions
// =====================================================

function openEventsModal() {
    renderEvents();
    eventsModal.classList.add('active');
    document.body.classList.add('modal-open');

    const closeBtn = eventsModal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.focus();
    }

    document.addEventListener('keydown', handleEscapeKey);
}

function closeEventsModal() {
    eventsModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscapeKey);
}

function openContactModal() {
    contactModal.classList.add('active');
    document.body.classList.add('modal-open');

    const closeBtn = contactModal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.focus();
    }

    document.addEventListener('keydown', handleEscapeKey);
}

function closeContactModal() {
    contactModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscapeKey);
}

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

function renderEvents() {
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

function filterUpcomingEvents(events) {
    return events.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
}

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

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =====================================================
// Card Interaction Handlers
// =====================================================

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

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function setupTouchOptimizations() {
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');

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

function init() {
    console.log('American Corner Mtaani Dashboard Initialized');

    setupCardKeyboardNavigation();
    setupHeaderScroll();
    setupTouchOptimizations();

    console.log('Current Date:', new Date().toLocaleDateString());
    console.log('Upcoming Events:', filterUpcomingEvents(eventsData).length);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// =====================================================
// Utility Functions for Admin Use
// =====================================================

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

window.listEvents = function() {
    console.table(eventsData.map(e => ({
        ID: e.id,
        Title: e.title,
        Date: e.date,
        Time: e.time,
        Category: e.category
    })));
};

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

// Staff Login Navigation
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

// Quick sign-in function for QR scanner
function quickSignInWithQR() {
    const signInUrl = "https://docs.google.com/forms/d/e/1FAIpQLScyJrGQjMwthJAHWB2cb7CgKce8sgw6DhwbJvr_R7n_zorhcA/viewform";
    window.open(signInUrl, '_blank');

    const qrElement = document.querySelector('.hero-qr-scanner');
    if (qrElement) {
        qrElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            qrElement.style.transform = '';
        }, 150);
    }

    console.log('QR Scanner clicked - Opening sign-in form for quick attendance');
}
