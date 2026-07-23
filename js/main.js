/* =====================================================
   American Corner Mtaani - Main JavaScript
   Kenya National Library Service, Nairobi
   ===================================================== */

// =====================================================
// Form Configuration — each card maps to a Firebase Realtime
// Database node. Nodes are created automatically the first
// time data is pushed; nothing to configure in the console.
// =====================================================
const FORM_CONFIG = {
    signIn: {
        title: 'AC Mtaani Sign In',
        node: 'signIns',
        purposeLabel: 'Purpose of Visit',
        purposePlaceholder: 'e.g. Study, research, use computers...',
        successMessage: "You're signed in. Welcome to American Corner Mtaani!"
    },
    attendance: {
        title: 'Program Attendance',
        node: 'attendance',
        purposeLabel: 'Program Attended',
        purposePlaceholder: 'e.g. Business & Entrepreneurship Training',
        successMessage: 'Your attendance has been recorded. Thank you!'
    },
    feedback: {
        title: 'Feedback',
        node: 'feedback',
        purposeLabel: 'Topic',
        purposePlaceholder: 'e.g. Program feedback, facility feedback...',
        extraField: {
            label: 'Your Feedback',
            placeholder: 'Tell us about your experience...',
            key: 'message',
            required: true
        },
        successMessage: 'Thank you for sharing your feedback!'
    },
    request: {
        title: 'Request & Return',
        node: 'requests',
        purposeLabel: 'Resource / Item',
        purposePlaceholder: 'e.g. Book title, laptop, chromebook...',
        extraField: {
            label: 'Request Type',
            placeholder: "Type 'Request' or 'Return'",
            key: 'requestType',
            required: true
        },
        successMessage: 'Your request has been submitted. Our team will be in touch.'
    },
    volunteer: {
        title: 'Volunteer Sign Up',
        node: 'volunteers',
        purposeLabel: 'Area of Interest',
        purposePlaceholder: 'e.g. Teaching, event support, tech help...',
        successMessage: 'Thanks for volunteering! We will reach out soon.'
    },
    eventRSVP: {
        title: 'Event RSVP',
        node: 'eventRSVPs',
        purposeLabel: 'Event',
        purposePlaceholder: '',
        successMessage: "You're on the list! See you at the event."
    }
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
        image: "https://res.cloudinary.com/ygairs70/image/upload/v1783676730/tech_program_uwhovv.png"
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

// Track which FORM_CONFIG entry is currently open in the modal, plus any
// values that should be pre-filled and locked (e.g. an event title for RSVP).
let activeFormKey = null;
let activeFormPrefill = null;

/**
 * Build and open the in-page form for a given FORM_CONFIG key.
 * @param {string} formKey - Key into FORM_CONFIG
 * @param {Object} [prefill] - Optional { purpose: 'some value', lockPurpose: true }
 */
function openFormModal(formKey, prefill) {
    const config = FORM_CONFIG[formKey];
    if (!config) {
        console.warn(`No form configuration found for: ${formKey}`);
        alert('This form is being set up. Please check back soon!');
        return;
    }

    const formModal = document.getElementById('formModal');
    const formTitleText = document.getElementById('formModalTitleText');
    const dataForm = document.getElementById('dataForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const purposeLabel = document.getElementById('purposeLabel');
    const fieldPurpose = document.getElementById('fieldPurpose');
    const extraFieldGroup = document.getElementById('extraFieldGroup');
    const extraFieldLabel = document.getElementById('extraFieldLabel');
    const fieldExtra = document.getElementById('fieldExtra');
    const submitBtn = document.getElementById('formSubmitBtn');

    if (!formModal || !dataForm || !formSuccess) {
        console.error('Form modal elements are missing from the page.');
        return;
    }

    activeFormKey = formKey;
    activeFormPrefill = prefill || null;

    // Reset UI state
    dataForm.reset();
    dataForm.style.display = '';
    formSuccess.classList.remove('active');
    if (formError) {
        formError.classList.remove('active');
        formError.textContent = '';
    }
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Submit</span><i class="fa-solid fa-arrow-right"></i>';
    }

    formTitleText.textContent = config.title;
    purposeLabel.textContent = config.purposeLabel;
    fieldPurpose.placeholder = config.purposePlaceholder || '';

    if (prefill && prefill.purpose) {
        fieldPurpose.value = prefill.purpose;
        fieldPurpose.readOnly = !!prefill.lockPurpose;
    } else {
        fieldPurpose.value = '';
        fieldPurpose.readOnly = false;
    }

    if (config.extraField) {
        extraFieldGroup.style.display = '';
        extraFieldLabel.textContent = config.extraField.label;
        fieldExtra.placeholder = config.extraField.placeholder || '';
        fieldExtra.required = !!config.extraField.required;
    } else {
        extraFieldGroup.style.display = 'none';
        fieldExtra.required = false;
        fieldExtra.value = '';
    }

    formModal.classList.add('active');
    document.body.classList.add('modal-open');

    const closeBtn = formModal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();

    document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Handle submission of the in-page form: validate, write to Firebase,
 * then show the success state.
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const config = FORM_CONFIG[activeFormKey];
    if (!config) return false;

    const dataForm = document.getElementById('dataForm');
    const formSuccess = document.getElementById('formSuccess');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const formError = document.getElementById('formError');
    const submitBtn = document.getElementById('formSubmitBtn');

    const name = document.getElementById('fieldName').value.trim();
    const email = document.getElementById('fieldEmail').value.trim();
    const phone = document.getElementById('fieldPhone').value.trim();
    const purpose = document.getElementById('fieldPurpose').value.trim();
    const extra = document.getElementById('fieldExtra').value.trim();

    if (!name || !email || !phone || !purpose) {
        if (formError) {
            formError.textContent = 'Please fill in all required fields.';
            formError.classList.add('active');
        }
        return false;
    }

    if (typeof window.submitToFirebase !== 'function') {
        if (formError) {
            formError.textContent = 'Unable to connect to the database right now. Please try again in a moment.';
            formError.classList.add('active');
        }
        console.error('window.submitToFirebase is not available yet — check the Firebase module script.');
        return false;
    }

    if (formError) {
        formError.classList.remove('active');
        formError.textContent = '';
    }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner"></i><span class="btn-text">Submitting...</span>';
    }

    const entry = { name, email, phone, purpose };
    if (config.extraField) {
        entry[config.extraField.key] = extra;
    }

    window.submitToFirebase(config.node, entry)
        .then(() => {
            dataForm.style.display = 'none';
            if (formSuccessMessage) formSuccessMessage.textContent = config.successMessage;
            formSuccess.classList.add('active');
        })
        .catch((err) => {
            console.error('Error saving to Firebase:', err);
            if (formError) {
                formError.textContent = 'Something went wrong saving your submission. Please try again.';
                formError.classList.add('active');
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Submit</span><i class="fa-solid fa-arrow-right"></i>';
            }
        });

    return false;
}

/**
 * Close the form modal and land back on the homepage
 */
function closeFormModal() {
    const formModal = document.getElementById('formModal');
    if (!formModal) return;

    formModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscapeKey);

    activeFormKey = null;
    activeFormPrefill = null;

    const homeSection = document.getElementById('events');
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Open the in-page form for a given card (signIn, attendance, feedback, request, volunteer)
 * @param {string} formType - The type of form to navigate to
 */
function navigateToForm(formType) {
    openFormModal(formType);
}

/**
 * Navigate to an event's RSVP form (now an in-page form backed by Firebase,
 * pre-filled and locked to that event's title)
 */
function navigateToEventRSVP(eventTitle) {
    openFormModal('eventRSVP', { purpose: eventTitle || '', lockPurpose: true });
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
            <button class="event-rsvp-btn" onclick="navigateToEventRSVP('${escapeHtml(event.title).replace(/'/g, "\\'")}')">
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
// QR Code — generated locally (no bitly / link shortener).
// The QR encodes a link back to this same page with ?checkin=1,
// so scanning it with a phone camera opens the Sign In form directly.
// =====================================================

function getSignInDeepLink() {
    const url = new URL(window.location.href);
    url.hash = '';
    url.searchParams.set('checkin', '1');
    return url.toString();
}

function renderSignInQRCode() {
    const container = document.getElementById('qrScannerImage');
    if (!container) return;

    if (typeof QRCode === 'undefined') {
        console.warn('QRCode library not loaded yet — retrying shortly.');
        setTimeout(renderSignInQRCode, 400);
        return;
    }

    container.innerHTML = '';
    new QRCode(container, {
        text: getSignInDeepLink(),
        width: 94,
        height: 94,
        colorDark: '#0a2240',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
    });
}

/**
 * If the page was opened via the QR code (?checkin=1), open the Sign In
 * form automatically, then clean the URL so a refresh doesn't re-trigger it.
 */
function checkForQRSignIn() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkin') === '1') {
        params.delete('checkin');
        const cleanUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '') + window.location.hash;
        window.history.replaceState({}, '', cleanUrl);
        navigateToForm('signIn');
    }
}



function init() {
    console.log('American Corner Mtaani Dashboard Initialized');

    setupCardKeyboardNavigation();
    setupHeaderScroll();
    setupTouchOptimizations();
    renderSignInQRCode();
    checkForQRSignIn();

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
    const requiredFields = ['title', 'date', 'month', 'day', 'time', 'description', 'category'];
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

window.updateFormConfig = function(formType, updates) {
    if (FORM_CONFIG.hasOwnProperty(formType)) {
        Object.assign(FORM_CONFIG[formType], updates);
        console.log(`Updated ${formType} config:`, FORM_CONFIG[formType]);
        return true;
    }
    console.error('Invalid form type. Available types:', Object.keys(FORM_CONFIG));
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

// Quick sign-in function for QR scanner — opens the local Sign In form (Firebase-backed)
function quickSignInWithQR() {
    const qrElement = document.querySelector('.hero-qr-scanner');
    if (qrElement) {
        qrElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            qrElement.style.transform = '';
        }, 150);
    }

    navigateToForm('signIn');
    console.log('QR Scanner clicked - Opening local sign-in form');
}
