/**
 * navigation.js - Handle SPA navigation and hash-based routing
 */

const SECTIONS = [
    { id: 'journey', label: 'Professional Journey', number: 1 },
    { id: 'thought-leadership', label: 'Thought Leadership', number: 2 },
    { id: 'innovations', label: 'Innovations', number: 3 },
    { id: 'building', label: 'Personal Building', number: 4 }
];

let currentSection = 'journey';

/**
 * Get the current active section
 * @returns {string} Section ID
 */
function getCurrentSection() {
    return currentSection;
}

/**
 * Get all sections
 * @returns {Array} Array of section objects
 */
function getSections() {
    return SECTIONS;
}

/**
 * Parse hash from URL
 * @returns {string} Section ID from hash or default
 */
function getHashSection() {
    const hash = window.location.hash.slice(1);
    return SECTIONS.some(s => s.id === hash) ? hash : 'journey';
}

/**
 * Set hash in URL
 * @param {string} sectionId - Section ID to set
 */
function setHash(sectionId) {
    window.location.hash = `#${sectionId}`;
}

/**
 * Activate a section
 * @param {string} sectionId - Section to activate
 */
function activateSection(sectionId) {
    const validSection = SECTIONS.find(s => s.id === sectionId);
    if (!validSection) return;
    
    currentSection = sectionId;
    
    // Update navigation UI
    updateNavigationState();
    
    // Update section visibility
    updateSectionVisibility();
    
    // Smooth scroll to content
    const sectionElement = document.getElementById(`section-${sectionId}`);
    if (sectionElement) {
        // On mobile, scroll to section
        if (window.innerWidth < 768) {
            sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // On desktop, the sidebar is sticky, just ensure content is visible
            sectionElement.style.display = 'block';
        }
    }
}

/**
 * Update navigation button states
 */
function updateNavigationState() {
    document.querySelectorAll('.nav-item').forEach(navItem => {
        const sectionId = navItem.getAttribute('data-section');
        if (sectionId === currentSection) {
            navItem.classList.add('active');
            navItem.setAttribute('aria-current', 'page');
        } else {
            navItem.classList.remove('active');
            navItem.removeAttribute('aria-current');
        }
    });
}

/**
 * Update section visibility
 */
function updateSectionVisibility() {
    document.querySelectorAll('.content-section').forEach(section => {
        const sectionId = section.getAttribute('data-section');
        if (sectionId === currentSection) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

/**
 * Render navigation
 */
function renderNavigation() {
    const navElement = document.getElementById('section-navigation');
    if (!navElement) return;
    
    navElement.innerHTML = '';
    
    SECTIONS.forEach((section, index) => {
        const navItem = createElement('button', {
            class: `nav-item ${section.id === currentSection ? 'active' : ''}`,
            attrs: {
                'data-section': section.id,
                'aria-current': section.id === currentSection ? 'page' : 'false'
            }
        });
        
        // Add number
        const number = createElement('span', {
            class: 'nav-number',
            text: String(section.number).padStart(2, '0')
        });
        navItem.appendChild(number);
        
        // Add separator
        const sep = createElement('span', {
            class: 'nav-separator',
            text: '·'
        });
        navItem.appendChild(sep);
        
        // Add label
        const label = createElement('span', {
            class: 'nav-label',
            text: section.label
        });
        navItem.appendChild(label);
        
        // Add click handler
        navItem.addEventListener('click', (e) => {
            e.preventDefault();
            setHash(section.id);
        });
        
        navElement.appendChild(navItem);
    });
}

/**
 * Handle hash change event
 */
function onHashChange() {
    const newSection = getHashSection();
    if (newSection !== currentSection) {
        activateSection(newSection);
    }
}

/**
 * Initialize navigation
 */
function initializeNavigation() {
    // Render navigation UI
    renderNavigation();
    
    // Set initial section from hash or default
    const initialSection = getHashSection();
    currentSection = initialSection;
    updateNavigationState();
    updateSectionVisibility();
    
    // Handle hash changes
    window.addEventListener('hashchange', onHashChange);
    
    // Handle browser back/forward
    window.addEventListener('popstate', onHashChange);
}

/**
 * Cleanup navigation
 */
function cleanupNavigation() {
    window.removeEventListener('hashchange', onHashChange);
    window.removeEventListener('popstate', onHashChange);
}
