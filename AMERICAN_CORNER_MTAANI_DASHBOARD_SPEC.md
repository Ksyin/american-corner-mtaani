# American Corner Mtaani - Dashboard Website Specification

## 📋 Project Overview

Build a **simple, visually appealing tablet-friendly dashboard** for **American Corner Mtaani** located at KNLS (Kenya National Library Service), Nairobi, Kenya. This is part of the U.S. Embassy's American Spaces Kenya network.

**Target Device:** Tablet (primary), Mobile (secondary), Desktop (tertiary)
**Technology Stack:** Pure HTML5, CSS3, and Vanilla JavaScript (NO frameworks)

---

## 🎨 Brand Identity & Theme

### Colors (Based on American Spaces / U.S. Embassy Kenya)
```css
:root {
  --primary-navy: #0a2240;        /* Dark navy blue - primary */
  --primary-blue: #2260a9;        /* Medium blue - accent */
  --light-blue: #e8f4fc;          /* Light blue - backgrounds */
  --white: #ffffff;
  --red-accent: #b22234;          /* American red - for highlights */
  --text-dark: #333333;
  --text-light: #666666;
  --success-green: #28a745;
  --gold-accent: #c9a227;         /* For special highlights */
}
```

### Typography
- **Headings:** Sans-serif (system fonts: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial)
- **Body:** Same font family, lighter weight
- **Font sizes:** Large and readable for tablet touch interfaces

### Logo & Branding
- Include U.S. Department of State logo
- American Corner Mtaani branding
- Partner logo: Kenya National Library Service (KNLS)

---

## 📐 Page Structure

### Single Page Application Layout

```
┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
│  [U.S. Embassy Logo]  American Corner Mtaani  [KNLS Logo]   │
│                    Maktaba Kuu, Nairobi                      │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                    HERO SECTION                              │
│         "Welcome to American Corner Mtaani"                  │
│      "Your Gateway to American Resources & Opportunities"    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                  DASHBOARD CARDS GRID                        │
│                                                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│   │   📝        │  │   📅        │  │   📚        │        │
│   │  Sign In    │  │   View      │  │   Study     │        │
│   │   Form      │  │  Events     │  │  in USA     │        │
│   └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│   │   💼        │  │   🎯        │  │   📞        │        │
│   │  Programs   │  │  English    │  │  Contact    │        │
│   │  & Workshops│  │  Classes    │  │    Us       │        │
│   └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                        FOOTER                                │
│   Social Links | Contact Info | © 2026 American Spaces      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Core Features

### 1. Dashboard Cards (Main Feature)

Each card should:
- Have a large touch-friendly target area (minimum 100px × 100px)
- Display an icon, title, and brief description
- Have hover/touch effects (scale up slightly, shadow)
- Be responsive (2-3 columns on tablet, 1-2 on mobile)

#### Card 1: Sign In / Visitor Registration
- **Icon:** 📝 or clipboard icon
- **Title:** "Sign In"
- **Description:** "Register your visit today"
- **Action:** Opens Google Form for visitor sign-in
- **Google Form URL:** `[PLACEHOLDER_SIGNIN_FORM_URL]`

#### Card 2: View Events (Special Interactive Card)
- **Icon:** 📅 or calendar icon  
- **Title:** "Upcoming Events"
- **Description:** "Browse and RSVP for events"
- **Action:** Opens a modal/dropdown showing list of upcoming events
- **Sub-feature:** Each event in the list links to its specific Google Form RSVP

#### Card 3: Study in the USA
- **Icon:** 🎓 or graduation cap
- **Title:** "Study in the USA"
- **Description:** "Educational advising & resources"
- **Action:** Opens Google Form or external link

#### Card 4: Programs & Workshops
- **Icon:** 💼 or briefcase
- **Title:** "Programs"
- **Description:** "Skills workshops & training"
- **Action:** Opens relevant form or page

#### Card 5: English Classes
- **Icon:** 🗣️ or book icon
- **Title:** "English Classes"
- **Description:** "Improve your English skills"
- **Action:** Opens registration form

#### Card 6: Contact Us
- **Icon:** 📞 or phone icon
- **Title:** "Contact Us"
- **Description:** "Get in touch with us"
- **Action:** Opens contact modal with info

---

### 2. Events Feature (Detailed Specification)

This is the most interactive feature. When user clicks "View Events" card:

#### Step 1: Events Modal Opens
```
┌─────────────────────────────────────────┐
│  ✕                  Upcoming Events     │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📅 Jan 15, 2026                   │  │
│  │ English Conversation Club         │  │
│  │ 2:00 PM - 4:00 PM                │  │
│  │ [RSVP NOW →]                      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📅 Jan 20, 2026                   │  │
│  │ Study in USA Information Session  │  │
│  │ 10:00 AM - 12:00 PM              │  │
│  │ [RSVP NOW →]                      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📅 Jan 25, 2026                   │  │
│  │ AI & Digital Skills Workshop      │  │
│  │ 9:00 AM - 1:00 PM                │  │
│  │ [RSVP NOW →]                      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📅 Feb 1, 2026                    │  │
│  │ Entrepreneurship Bootcamp         │  │
│  │ 8:00 AM - 5:00 PM                │  │
│  │ [RSVP NOW →]                      │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

#### Step 2: User Clicks "RSVP NOW"
- Redirects to the specific Google Form for that event
- Each event has its own RSVP Google Form URL

#### Events Data Structure (JavaScript)
```javascript
const events = [
  {
    id: 1,
    title: "English Conversation Club",
    date: "January 15, 2026",
    time: "2:00 PM - 4:00 PM",
    description: "Practice your English speaking skills in a friendly environment",
    rsvpUrl: "https://forms.google.com/PLACEHOLDER_EVENT_1"
  },
  {
    id: 2,
    title: "Study in USA Information Session",
    date: "January 20, 2026",
    time: "10:00 AM - 12:00 PM",
    description: "Learn about educational opportunities in the United States",
    rsvpUrl: "https://forms.google.com/PLACEHOLDER_EVENT_2"
  },
  // Add more events...
];
```

---

## 📱 Responsive Design Requirements

### Tablet (768px - 1024px) - PRIMARY
- 2-3 column card grid
- Large touch targets (min 48px)
- Font size: 18-24px for body
- Cards: ~300px wide
- Full-width modal for events

### Mobile (< 768px)
- Single column layout
- Stacked cards
- Bottom sheet style for events modal
- Hamburger menu if needed

### Desktop (> 1024px)
- 3 column grid
- Centered content with max-width: 1200px
- Enhanced hover effects

---

## 🖼️ Visual Design Specifications

### Cards Design
```css
.dashboard-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-align: center;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
}

.dashboard-card:hover,
.dashboard-card:active {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(34, 96, 169, 0.2);
  border-color: var(--primary-blue);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: var(--primary-blue);
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--primary-navy);
  margin-bottom: 8px;
}

.card-description {
  font-size: 14px;
  color: var(--text-light);
}
```

### Header Design
- Sticky header on scroll
- White background with subtle shadow
- Logos on left and right
- Center: "American Corner Mtaani"

### Hero Section
- Background: Gradient from navy to blue
- Optional: Background image with overlay
- White text
- Welcoming message

### Events Modal
- Full-screen overlay with semi-transparent background
- Centered modal with rounded corners
- Scrollable event list
- Clear close button (×) in top-right
- Each event card is clickable

---

## 📁 File Structure

```
american-corner-mtaani/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   ├── us-embassy-logo.png
│   ├── knls-logo.png
│   ├── american-corner-logo.png
│   ├── hero-bg.jpg (optional)
│   └── icons/ (if using custom icons)
└── README.md
```

---

## 🔧 JavaScript Functionality

### Required Functions

```javascript
// 1. Modal Management
function openEventsModal() { }
function closeEventsModal() { }
function closeModalOnOutsideClick(event) { }
function closeModalOnEscape(event) { }

// 2. Events Rendering
function renderEvents(events) { }
function filterUpcomingEvents(events) { }

// 3. Navigation
function navigateToForm(url) { }
function openInNewTab(url) { }

// 4. Touch/Click Handlers
function handleCardClick(cardType) { }

// 5. Accessibility
function trapFocus(modal) { }
function restoreFocus() { }
```

---

## ✅ Accessibility Requirements

1. **Keyboard Navigation:** All interactive elements accessible via Tab
2. **ARIA Labels:** Proper labels for buttons and modals
3. **Focus Management:** Trap focus in modal when open
4. **Color Contrast:** Minimum 4.5:1 ratio
5. **Touch Targets:** Minimum 48px × 48px
6. **Screen Reader:** Semantic HTML, proper heading hierarchy

---

## 📝 Content to Include

### Header Text
- "American Corner Mtaani"
- "Kenya National Library Service, Nairobi"

### Hero Section
- **Title:** "Welcome to American Corner Mtaani"
- **Subtitle:** "Your Gateway to American Resources, Education & Opportunities"
- **Tagline:** "Funded by the American people. Focused on Kenya. Driven by what you do next."

### Footer Content
```
American Corner Mtaani
Kenya National Library Service (KNLS)
Maktaba Kuu Building, Ngong Road, Upper Hill
Nairobi, Kenya

📞 +254 20 273 9893
📧 [Email placeholder]

Follow Us:
Facebook: @AmericanCornerMtaani
Instagram: @usembassykenya
Twitter/X: @USEmbassyKenya

© 2026 American Spaces Kenya | U.S. Embassy Nairobi
```

### Social Media Links
- Facebook: https://web.facebook.com/people/American-Corner-Mtaani/61565093887159/
- Instagram: https://www.instagram.com/usembassykenya
- Twitter/X: https://twitter.com/USEmbassyKenya
- YouTube: https://www.youtube.com/@USEmbassyNairobi

---

## 🔗 Placeholder Google Form URLs

Replace these with actual Google Form URLs:

```javascript
const FORM_URLS = {
  signIn: "https://docs.google.com/forms/d/e/XXXXXX/viewform",
  studyUSA: "https://docs.google.com/forms/d/e/XXXXXX/viewform",
  englishClasses: "https://docs.google.com/forms/d/e/XXXXXX/viewform",
  programs: "https://docs.google.com/forms/d/e/XXXXXX/viewform",
  events: {
    event1: "https://docs.google.com/forms/d/e/XXXXXX/viewform",
    event2: "https://docs.google.com/forms/d/e/XXXXXX/viewform",
    event3: "https://docs.google.com/forms/d/e/XXXXXX/viewform",
    event4: "https://docs.google.com/forms/d/e/XXXXXX/viewform"
  }
};
```

---

## 🎯 Sample Events Data

```javascript
const sampleEvents = [
  {
    id: 1,
    title: "English Conversation Club",
    date: "2026-01-15",
    displayDate: "Wednesday, January 15, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "American Corner Mtaani, KNLS",
    description: "Join us for interactive English practice sessions. All levels welcome!",
    category: "English",
    rsvpUrl: "PLACEHOLDER_URL"
  },
  {
    id: 2,
    title: "Study in the USA: Information Session",
    date: "2026-01-20",
    displayDate: "Monday, January 20, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "American Corner Mtaani, KNLS",
    description: "Learn about scholarships, application processes, and student life in America.",
    category: "Education",
    rsvpUrl: "PLACEHOLDER_URL"
  },
  {
    id: 3,
    title: "Digital Skills: AI for Beginners",
    date: "2026-01-25",
    displayDate: "Saturday, January 25, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "American Corner Mtaani, KNLS",
    description: "Introduction to artificial intelligence and its practical applications.",
    category: "Technology",
    rsvpUrl: "PLACEHOLDER_URL"
  },
  {
    id: 4,
    title: "Youth Entrepreneurship Workshop",
    date: "2026-02-01",
    displayDate: "Saturday, February 1, 2026",
    time: "8:00 AM - 5:00 PM",
    location: "American Corner Mtaani, KNLS",
    description: "Full-day workshop on starting and growing your business.",
    category: "Entrepreneurship",
    rsvpUrl: "PLACEHOLDER_URL"
  },
  {
    id: 5,
    title: "Movie Night: American Cinema",
    date: "2026-02-07",
    displayDate: "Friday, February 7, 2026",
    time: "5:00 PM - 8:00 PM",
    location: "American Corner Mtaani, KNLS",
    description: "Watch and discuss classic American films.",
    category: "Culture",
    rsvpUrl: "PLACEHOLDER_URL"
  }
];
```

---

## 🚀 Implementation Checklist

### Phase 1: Structure
- [ ] Create HTML file with semantic structure
- [ ] Set up CSS file with variables and base styles
- [ ] Create JavaScript file with event data

### Phase 2: Styling
- [ ] Style header with logos
- [ ] Design hero section
- [ ] Create card grid layout
- [ ] Style individual cards with icons
- [ ] Design footer

### Phase 3: Interactivity
- [ ] Implement card click handlers
- [ ] Build events modal
- [ ] Render events list dynamically
- [ ] Add RSVP button functionality
- [ ] Implement modal open/close

### Phase 4: Responsiveness
- [ ] Tablet layout (primary)
- [ ] Mobile layout
- [ ] Desktop enhancements

### Phase 5: Polish
- [ ] Add animations/transitions
- [ ] Implement accessibility features
- [ ] Test touch interactions
- [ ] Cross-browser testing

---

## 📌 Important Notes

1. **No Backend Required:** All data is hardcoded in JavaScript. Events can be updated by editing the JS file.

2. **Google Forms Integration:** Simply redirect users to Google Form URLs. No embedding needed.

3. **Offline Consideration:** Site should work offline for basic viewing (forms require internet).

4. **Performance:** Keep it lightweight - no heavy libraries or frameworks.

5. **Updates:** Events array should be easy to update by non-technical staff (clear comments in code).

---

## 🎨 Icon Options

Use either:
1. **Emoji icons** (simplest, no extra files)
2. **Font Awesome** (via CDN)
3. **Google Material Icons** (via CDN)
4. **Custom SVG icons**

Recommended: Font Awesome via CDN for professional look:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

---

## Example Card Icons (Font Awesome)

```html
<!-- Sign In -->
<i class="fa-solid fa-clipboard-user"></i>

<!-- Events -->
<i class="fa-solid fa-calendar-days"></i>

<!-- Study USA -->
<i class="fa-solid fa-graduation-cap"></i>

<!-- Programs -->
<i class="fa-solid fa-chalkboard-user"></i>

<!-- English Classes -->
<i class="fa-solid fa-book-open"></i>

<!-- Contact -->
<i class="fa-solid fa-phone"></i>
```

---

## 🏁 Final Deliverable

A single-page, responsive dashboard that:
1. Looks professional and matches American Spaces branding
2. Works flawlessly on tablets
3. Allows visitors to sign in via Google Form
4. Shows upcoming events with RSVP links
5. Provides quick access to various programs and resources
6. Is easy to maintain and update

---

*Document Version: 1.0*
*Created: January 2026*
*For: American Corner Mtaani, KNLS Nairobi*
