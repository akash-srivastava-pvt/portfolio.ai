/**
 * app.js - Main application orchestration
 * Coordinates loading, rendering, and initialization
 */

let portfolio = null;

/**
 * Render the profile sidebar
 */
async function renderProfileSidebar() {
    const config = getConfig();
    
    // Profile image
    const profileImg = document.getElementById('profile-image');
    if (config.profile?.image?.src) {
        profileImg.src = config.profile.image.src;
        profileImg.alt = config.profile.image.alt || 'Profile image';
    }
    
    // Profile name
    const profileName = document.getElementById('profile-name');
    if (config.profile?.name) {
        profileName.textContent = config.profile.name;
    }
    
    // Profile title
    const profileTitle = document.getElementById('profile-title');
    if (config.profile?.title) {
        profileTitle.textContent = config.profile.title;
    }
    
    // Social links
    const socialLinksContainer = document.getElementById('social-links');
    if (socialLinksContainer) {
        socialLinksContainer.innerHTML = '';
        
        const platforms = ['github', 'linkedin', 'youtube', 'instagram'];
        
        platforms.forEach(platform => {
            const url = config.social?.[platform];
            if (url) {
                const link = createSocialLink(platform, url);
                socialLinksContainer.appendChild(link);
            }
        });
    }
    
    // About section
    const aboutHeadline = document.getElementById('about-headline');
    if (config.about?.headline) {
        aboutHeadline.textContent = config.about.headline;
    }
    
    const aboutDescription = document.getElementById('about-description');
    if (config.about?.description) {
        aboutDescription.textContent = config.about.description;
    }
    
    // Focus areas
    const focusAreasContainer = document.getElementById('focus-areas');
    if (focusAreasContainer && config.about?.focus) {
        focusAreasContainer.innerHTML = '';
        
        if (config.about.focus.length > 0) {
            const focusLabel = createElement('p', {
                class: 'focus-label',
                text: 'Focus areas'
            });
            focusAreasContainer.appendChild(focusLabel);
            
            const tagContainer = createElement('div', {
                class: 'focus-tags'
            });
            
            config.about.focus.forEach(area => {
                const tag = createTag(area);
                tagContainer.appendChild(tag);
            });
            
            focusAreasContainer.appendChild(tagContainer);
        }
    }
    
    // About footer (location + status)
    const aboutFooter = document.getElementById('about-footer');
    if (aboutFooter) {
        aboutFooter.innerHTML = '';
        
        const details = [];
        
        if (config.about?.location) {
            details.push(`📍 ${config.about.location}`);
        }
        
        if (config.about?.status) {
            details.push(`✨ ${config.about.status}`);
        }
        
        details.forEach((detail, idx) => {
            if (idx > 0) {
                const separator = createElement('span', {
                    text: ' · '
                });
                aboutFooter.appendChild(separator);
            }
            
            const text = createElement('span', {
                text: detail
            });
            aboutFooter.appendChild(text);
        });
    }
}

/**
 * Render professional career section
 */
function renderCareerSection() {
    const config = getConfig();
    const container = document.getElementById('journey-content');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Career items
    const careerItems = config.professionalCareer || [];
    const engineeringItems = config.engineeringExperience || [];
    
    if (careerItems.length === 0 && engineeringItems.length === 0) {
        container.appendChild(createEmptyState('Career information coming soon.'));
        return;
    }
    
    // Professional Career subsection
    if (careerItems.length > 0) {
        const careerSection = createElement('div', {
            class: 'subsection'
        });
        
        const careerTitle = createElement('h3', {
            class: 'subsection-title',
            text: 'Professional Career'
        });
        careerSection.appendChild(careerTitle);
        
        const timeline = createElement('div', {
            class: 'career-timeline'
        });
        
        careerItems.forEach(career => {
            const careerItem = createCareerItem(career);
            timeline.appendChild(careerItem);
        });
        
        careerSection.appendChild(timeline);
        container.appendChild(careerSection);
    }
    
    // Engineering Experience subsection
    if (engineeringItems.length > 0) {
        const engineeringSection = createElement('div', {
            class: 'subsection'
        });
        
        const engineeringTitle = createElement('h3', {
            class: 'subsection-title',
            text: 'Engineering Experience'
        });
        engineeringSection.appendChild(engineeringTitle);
        
        const grid = createElement('div', {
            class: 'engineering-grid'
        });
        
        engineeringItems.forEach(experience => {
            const item = createEngineeringItem(experience);
            grid.appendChild(item);
        });
        
        engineeringSection.appendChild(grid);
        container.appendChild(engineeringSection);
    }
}

/**
 * Render thought leadership section
 */
function renderThoughtLeadershipSection() {
    const config = getConfig();
    const container = document.getElementById('thought-leadership-content');
    if (!container) return;
    
    container.innerHTML = '';
    
    const thoughtItems = config.thoughtLeadership || [];
    const speakingItems = config.speakingWritingCommunity || [];
    
    if (thoughtItems.length === 0 && speakingItems.length === 0) {
        container.appendChild(createEmptyState('Thought leadership content coming soon.'));
        return;
    }
    
    // Thought Leadership subsection
    if (thoughtItems.length > 0) {
        const thoughtSection = createElement('div', {
            class: 'subsection'
        });
        
        const thoughtTitle = createElement('h3', {
            class: 'subsection-title',
            text: 'Articles & Publications'
        });
        thoughtSection.appendChild(thoughtTitle);
        
        const grid = createElement('div', {
            class: 'thoughts-grid'
        });
        
        thoughtItems.forEach(thought => {
            const item = createThoughtLeadershipItem(thought);
            grid.appendChild(item);
        });
        
        thoughtSection.appendChild(grid);
        container.appendChild(thoughtSection);
    }
    
    // Speaking / Writing / Community subsection
    if (speakingItems.length > 0) {
        const speakingSection = createElement('div', {
            class: 'subsection'
        });
        
        const speakingTitle = createElement('h3', {
            class: 'subsection-title',
            text: 'Speaking & Events'
        });
        speakingSection.appendChild(speakingTitle);
        
        const grid = createElement('div', {
            class: 'speaking-grid'
        });
        
        speakingItems.forEach(event => {
            const item = createSpeakingItem(event);
            grid.appendChild(item);
        });
        
        speakingSection.appendChild(grid);
        container.appendChild(speakingSection);
    }
}

/**
 * Render innovations section
 */
function renderInnovationsSection() {
    const config = getConfig();
    const container = document.getElementById('innovations-content');
    if (!container) return;
    
    container.innerHTML = '';
    
    const aiItems = config.aiLlmWork || [];
    const innovationItems = config.innovations || [];
    
    if (aiItems.length === 0 && innovationItems.length === 0) {
        container.appendChild(createEmptyState('Innovation projects coming soon.'));
        return;
    }
    
    // AI / LLM Work subsection
    if (aiItems.length > 0) {
        const aiSection = createElement('div', {
            class: 'subsection'
        });
        
        const aiTitle = createElement('h3', {
            class: 'subsection-title',
            text: 'AI & LLM Systems'
        });
        aiSection.appendChild(aiTitle);
        
        const grid = createElement('div', {
            class: 'projects-grid'
        });
        
        aiItems.forEach(aiProject => {
            const item = createProjectItem(aiProject);
            grid.appendChild(item);
        });
        
        aiSection.appendChild(grid);
        container.appendChild(aiSection);
    }
    
    // Innovations subsection
    if (innovationItems.length > 0) {
        const innovationSection = createElement('div', {
            class: 'subsection'
        });
        
        const innovationTitle = createElement('h3', {
            class: 'subsection-title',
            text: 'Projects & Innovations'
        });
        innovationSection.appendChild(innovationTitle);
        
        const grid = createElement('div', {
            class: 'projects-grid'
        });
        
        innovationItems.forEach(project => {
            const item = createProjectItem(project);
            grid.appendChild(item);
        });
        
        innovationSection.appendChild(grid);
        container.appendChild(innovationSection);
    }
}

/**
 * Render personal building section
 */
function renderBuildingSection() {
    const config = getConfig();
    const container = document.getElementById('building-content');
    if (!container) return;
    
    container.innerHTML = '';
    
    const openSourceItems = config.openSource || [];
    const buildingItems = config.personalBuilding || [];
    
    if (openSourceItems.length === 0 && buildingItems.length === 0) {
        container.appendChild(createEmptyState('Personal projects coming soon.'));
        return;
    }
    
    // Open Source subsection
    if (openSourceItems.length > 0) {
        const ossSection = createElement('div', {
            class: 'subsection'
        });
        
        const ossTitle = createElement('h3', {
            class: 'subsection-title',
            text: 'Open Source'
        });
        ossSection.appendChild(ossTitle);
        
        const grid = createElement('div', {
            class: 'projects-grid'
        });
        
        openSourceItems.forEach(ossProject => {
            const item = createProjectItem(ossProject);
            grid.appendChild(item);
        });
        
        ossSection.appendChild(grid);
        container.appendChild(ossSection);
    }
    
    // Personal Building subsection
    if (buildingItems.length > 0) {
        const buildingSection = createElement('div', {
            class: 'subsection'
        });
        
        const buildingTitle = createElement('h3', {
            class: 'subsection-title',
            text: 'Personal Experiments'
        });
        buildingSection.appendChild(buildingTitle);
        
        const grid = createElement('div', {
            class: 'projects-grid'
        });
        
        buildingItems.forEach(project => {
            const item = createProjectItem(project);
            grid.appendChild(item);
        });
        
        buildingSection.appendChild(grid);
        container.appendChild(buildingSection);
    }
}

/**
 * Render all content sections
 */
function renderAllSections() {
    renderCareerSection();
    renderThoughtLeadershipSection();
    renderInnovationsSection();
    renderBuildingSection();
}

/**
 * Render footer
 */
function renderFooter() {
    const config = getConfig();
    
    const footerText = document.getElementById('footer-text');
    if (config.footer?.copyright) {
        footerText.textContent = config.footer.copyright;
    }
    
    const footerSource = document.getElementById('footer-source');
    if (config.footer?.sourceUrl) {
        const link = createLink(config.footer.sourceUrl, 'Source →', {
            class: 'source-link'
        });
        footerSource.appendChild(link);
    }
}

/**
 * Update page metadata
 */
function updatePageMetadata() {
    const config = getConfig();
    
    // Title
    if (config.site?.title) {
        document.title = config.site.title;
    }
    
    // Description
    if (config.site?.description) {
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) {
            descMeta.setAttribute('content', config.site.description);
        }
    }
    
    // Author
    if (config.profile?.name) {
        const authorMeta = document.querySelector('meta[name="author"]');
        if (authorMeta) {
            authorMeta.setAttribute('content', config.profile.name);
        }
    }
}

/**
 * Handle errors
 */
function showError(message) {
    const errorContainer = document.getElementById('error');
    const errorMessage = document.getElementById('error-message');
    
    if (errorMessage) {
        errorMessage.textContent = message;
    }
    
    if (errorContainer) {
        errorContainer.style.display = 'block';
    }
    
    const loadingContainer = document.getElementById('loading');
    if (loadingContainer) {
        loadingContainer.style.display = 'none';
    }
    
    const contentContainer = document.getElementById('content');
    if (contentContainer) {
        contentContainer.style.display = 'none';
    }
}

/**
 * Initialize theme system
 */
function initializeTheme() {
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    
    // Use saved theme or system preference
    const theme = savedTheme || systemTheme;
    
    htmlElement.setAttribute('data-theme', theme);
    
    // Create theme toggle button
    createThemeToggle();
}

/**
 * Create theme toggle button
 */
function createThemeToggle() {
    const navContainer = document.querySelector('.section-navigation');
    if (!navContainer) return;
    
    // Add theme toggle to navigation
    const toggle = createElement('button', {
        class: 'theme-toggle',
        attrs: {
            'aria-label': 'Toggle dark/light mode',
            'title': 'Toggle theme'
        }
    });
    
    toggle.innerHTML = '<span class="theme-icon">🌙</span>';
    
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        toggle.innerHTML = newTheme === 'dark' ? '<span class="theme-icon">🌙</span>' : '<span class="theme-icon">☀️</span>';
    });
    
    // Insert before nav items or at the end
    navContainer.appendChild(toggle);
}

/**
 * Main initialization
 */
async function initialize() {
    try {
        // Show loading state
        const loadingContainer = document.getElementById('loading');
        if (loadingContainer) {
            loadingContainer.style.display = 'flex';
        }
        
        // Load configuration
        await loadConfig();
        
        // Hide loading, show content
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }
        
        const contentContainer = document.getElementById('content');
        if (contentContainer) {
            contentContainer.style.display = 'block';
        }
        
        // Render UI
        await renderProfileSidebar();
        renderAllSections();
        renderFooter();
        updatePageMetadata();
        
        // Initialize theme
        initializeTheme();
        
        // Initialize navigation
        initializeNavigation();
        
        console.log('Portfolio loaded successfully');
    } catch (error) {
        console.error('Failed to initialize portfolio:', error);
        showError(error.message);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initialize);
