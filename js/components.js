/**
 * components.js - Reusable component rendering functions
 * Provides functions to create common UI elements
 */

/**
 * Create and return a DOM element with optional attributes
 * @param {string} tag - HTML tag name
 * @param {Object} options - Options object
 * @param {string} options.class - CSS classes
 * @param {string} options.id - Element ID
 * @param {string} options.text - Text content
 * @param {string} options.html - HTML content
 * @param {Object} options.attrs - Additional HTML attributes
 * @param {Array} options.children - Child elements to append
 * @returns {HTMLElement}
 */
function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    
    if (options.class) {
        element.className = options.class;
    }
    
    if (options.id) {
        element.id = options.id;
    }
    
    if (options.text) {
        element.textContent = options.text;
    }
    
    if (options.html) {
        element.innerHTML = options.html;
    }
    
    if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    
    if (options.children) {
        options.children.forEach(child => {
            if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });
    }
    
    return element;
}

/**
 * Create a link element
 * @param {string} url - Link URL
 * @param {string} text - Link text
 * @param {Object} options - Additional options
 * @returns {HTMLAnchorElement}
 */
function createLink(url, text, options = {}) {
    const link = createElement('a', {
        class: options.class || '',
        text: text,
        attrs: {
            href: url,
            ...(url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})
        }
    });
    
    return link;
}

/**
 * Create a tag element for technologies/categories
 * @param {string} label - Tag label
 * @param {Object} options - Options
 * @returns {HTMLElement}
 */
function createTag(label, options = {}) {
    return createElement('span', {
        class: `tag ${options.class || ''}`,
        text: label
    });
}

/**
 * Create an image element with lazy loading
 * @param {string} src - Image source
 * @param {string} alt - Alt text
 * @param {Object} options - Options
 * @returns {HTMLImageElement}
 */
function createImage(src, alt, options = {}) {
    const img = createElement('img', {
        class: options.class || '',
        attrs: {
            src: src,
            alt: alt,
            loading: options.loading || 'lazy',
            decoding: 'async',
            ...(options.attrs || {})
        }
    });
    
    return img;
}

/**
 * Create an image gallery from array of images
 * @param {Array} images - Array of image objects with src, alt, caption
 * @returns {HTMLElement}
 */
function createImageGallery(images) {
    if (!images || images.length === 0) {
        return createElement('div');
    }
    
    const gallery = createElement('div', {
        class: 'image-gallery'
    });
    
    images.forEach((img, idx) => {
        const galleryItem = createElement('figure', {
            class: 'gallery-item'
        });
        
        const image = createImage(img.src, img.alt, {
            class: 'gallery-image'
        });
        galleryItem.appendChild(image);
        
        if (img.caption) {
            const caption = createElement('figcaption', {
                class: 'gallery-caption',
                text: img.caption
            });
            galleryItem.appendChild(caption);
        }
        
        gallery.appendChild(galleryItem);
    });
    
    return gallery;
}

/**
 * Create a section header with title
 * @param {string} title - Header title
 * @param {number} number - Optional section number
 * @returns {HTMLElement}
 */
function createSectionHeader(title, number = null) {
    const header = createElement('div', {
        class: 'section-header'
    });
    
    if (number !== null) {
        const num = createElement('span', {
            class: 'section-number',
            text: String(number).padStart(2, '0')
        });
        header.appendChild(num);
    }
    
    const titleEl = createElement('h2', {
        text: title
    });
    header.appendChild(titleEl);
    
    return header;
}

/**
 * Create an empty state message
 * @param {string} message - Message text
 * @returns {HTMLElement}
 */
function createEmptyState(message = 'No content available.') {
    return createElement('div', {
        class: 'empty-state',
        text: message
    });
}

/**
 * Create a career timeline item
 * @param {Object} career - Career object from config
 * @returns {HTMLElement}
 */
function createCareerItem(career) {
    const item = createElement('div', {
        class: 'career-item'
    });
    
    // Header with dates
    const header = createElement('div', {
        class: 'career-header'
    });
    
    const dateRange = createElement('span', {
        class: 'career-dates',
        text: `${career.startDate} — ${career.endDate}`
    });
    header.appendChild(dateRange);
    
    const company = createElement('h3', {
        class: 'career-company',
        text: career.company
    });
    header.appendChild(company);
    
    const role = createElement('p', {
        class: 'career-role',
        text: career.role
    });
    header.appendChild(role);
    
    item.appendChild(header);
    
    // Location
    if (career.location) {
        const location = createElement('p', {
            class: 'career-location',
            text: `📍 ${career.location}`
        });
        item.appendChild(location);
    }
    
    // Description
    if (career.description) {
        const desc = createElement('p', {
            class: 'career-description',
            text: career.description
        });
        item.appendChild(desc);
    }
    
    // Achievements
    if (career.achievements && career.achievements.length > 0) {
        const achievementsSection = createElement('div', {
            class: 'career-achievements'
        });
        
        const achievementTitle = createElement('p', {
            class: 'achievement-title',
            text: 'Achievements'
        });
        achievementsSection.appendChild(achievementTitle);
        
        const list = createElement('ul');
        career.achievements.forEach(achievement => {
            const li = createElement('li', {
                text: achievement
            });
            list.appendChild(li);
        });
        achievementsSection.appendChild(list);
        
        item.appendChild(achievementsSection);
    }
    
    // Technologies
    if (career.technologies && career.technologies.length > 0) {
        const techSection = createElement('div', {
            class: 'career-technologies'
        });
        
        career.technologies.forEach(tech => {
            const tag = createTag(tech);
            techSection.appendChild(tag);
        });
        
        item.appendChild(techSection);
    }
    
    return item;
}

/**
 * Create an engineering experience item
 * @param {Object} experience - Experience object from config
 * @returns {HTMLElement}
 */
function createEngineeringItem(experience) {
    const item = createElement('div', {
        class: 'engineering-item'
    });
    
    // Title
    const title = createElement('h3', {
        class: 'engineering-title',
        text: experience.title
    });
    item.appendChild(title);
    
    // Description
    if (experience.description) {
        const desc = createElement('p', {
            class: 'engineering-description',
            text: experience.description
        });
        item.appendChild(desc);
    }
    
    // Problem
    if (experience.problem) {
        const problemSection = createElement('div', {
            class: 'engineering-section'
        });
        const problemTitle = createElement('h4', {
            text: 'Problem'
        });
        const problemText = createElement('p', {
            text: experience.problem
        });
        problemSection.appendChild(problemTitle);
        problemSection.appendChild(problemText);
        item.appendChild(problemSection);
    }
    
    // Approach
    if (experience.approach) {
        const approachSection = createElement('div', {
            class: 'engineering-section'
        });
        const approachTitle = createElement('h4', {
            text: 'Approach'
        });
        const approachText = createElement('p', {
            text: experience.approach
        });
        approachSection.appendChild(approachTitle);
        approachSection.appendChild(approachText);
        item.appendChild(approachSection);
    }
    
    // Impact
    if (experience.impact) {
        const impactSection = createElement('div', {
            class: 'engineering-section'
        });
        const impactTitle = createElement('h4', {
            text: 'Impact'
        });
        const impactText = createElement('p', {
            text: experience.impact
        });
        impactSection.appendChild(impactTitle);
        impactSection.appendChild(impactText);
        item.appendChild(impactSection);
    }
    
    // Metrics
    if (experience.metrics && experience.metrics.length > 0) {
        const metricsSection = createElement('div', {
            class: 'metrics'
        });
        
        experience.metrics.forEach(metric => {
            const metricItem = createElement('div', {
                class: 'metric-item'
            });
            
            const value = createElement('span', {
                class: 'metric-value',
                text: metric.value
            });
            const label = createElement('span', {
                class: 'metric-label',
                text: metric.label
            });
            
            metricItem.appendChild(value);
            metricItem.appendChild(label);
            metricsSection.appendChild(metricItem);
        });
        
        item.appendChild(metricsSection);
    }
    
    // Technologies
    if (experience.technologies && experience.technologies.length > 0) {
        const techSection = createElement('div', {
            class: 'technologies'
        });
        
        experience.technologies.forEach(tech => {
            const tag = createTag(tech);
            techSection.appendChild(tag);
        });
        
        item.appendChild(techSection);
    }
    
    // Links
    if (experience.links && Object.keys(experience.links).length > 0) {
        const linksSection = createElement('div', {
            class: 'links'
        });
        
        Object.entries(experience.links).forEach(([type, url]) => {
            if (url) {
                const link = createLink(url, type, {
                    class: 'link-button'
                });
                linksSection.appendChild(link);
            }
        });
        
        item.appendChild(linksSection);
    }
    
    return item;
}

/**
 * Create a thought leadership item
 * @param {Object} item - Thought leadership item from config
 * @returns {HTMLElement}
 */
function createThoughtLeadershipItem(itemData) {
    const container = createElement('div', {
        class: 'thought-item'
    });
    
    // Meta info
    const meta = createElement('div', {
        class: 'thought-meta'
    });
    
    if (itemData.date) {
        const date = createElement('span', {
            class: 'thought-date',
            text: itemData.date
        });
        meta.appendChild(date);
    }
    
    if (itemData.type) {
        const type = createElement('span', {
            class: `thought-type type-${itemData.type}`,
            text: itemData.type.toUpperCase()
        });
        meta.appendChild(type);
    }
    
    container.appendChild(meta);
    
    // Title
    const title = createElement('h3', {
        class: 'thought-title',
        text: itemData.title
    });
    container.appendChild(title);
    
    // Description
    if (itemData.description) {
        const desc = createElement('p', {
            class: 'thought-description',
            text: itemData.description
        });
        container.appendChild(desc);
    }
    
    // Tags
    if (itemData.tags && itemData.tags.length > 0) {
        const tagsContainer = createElement('div', {
            class: 'tags'
        });
        
        itemData.tags.forEach(tag => {
            const tagEl = createTag(tag);
            tagsContainer.appendChild(tagEl);
        });
        
        container.appendChild(tagsContainer);
    }
    
    // Image
    if (itemData.image) {
        const imgWrapper = createElement('div', {
            class: 'thought-image'
        });
        const img = createImage(itemData.image.src, itemData.image.alt);
        imgWrapper.appendChild(img);
        container.appendChild(imgWrapper);
    }
    
    // Link
    if (itemData.url) {
        const link = createLink(itemData.url, 'Read / Watch →', {
            class: 'thought-link'
        });
        container.appendChild(link);
    }
    
    return container;
}

/**
 * Create an innovation/project item
 * @param {Object} project - Project object from config
 * @returns {HTMLElement}
 */
function createProjectItem(project) {
    const item = createElement('div', {
        class: `project-item project-status-${project.status || 'active'}`
    });
    
    // Status badge
    if (project.status) {
        const status = createElement('span', {
            class: 'status-badge',
            text: project.status.toUpperCase()
        });
        item.appendChild(status);
    }
    
    // Title
    const title = createElement('h3', {
        class: 'project-title',
        text: project.title || project.project
    });
    item.appendChild(title);
    
    // Description
    if (project.description) {
        const desc = createElement('p', {
            class: 'project-description',
            text: project.description
        });
        item.appendChild(desc);
    }
    
    // Problem statement
    if (project.problem) {
        const problemSection = createElement('div', {
            class: 'project-section'
        });
        const problemLabel = createElement('h4', {
            text: 'Problem'
        });
        const problemText = createElement('p', {
            text: project.problem
        });
        problemSection.appendChild(problemLabel);
        problemSection.appendChild(problemText);
        item.appendChild(problemSection);
    }
    
    // Approach
    if (project.approach) {
        const approachSection = createElement('div', {
            class: 'project-section'
        });
        const approachLabel = createElement('h4', {
            text: 'Approach'
        });
        const approachText = createElement('p', {
            text: project.approach
        });
        approachSection.appendChild(approachLabel);
        approachSection.appendChild(approachText);
        item.appendChild(approachSection);
    }
    
    // Impact
    if (project.impact) {
        const impactSection = createElement('div', {
            class: 'project-section'
        });
        const impactLabel = createElement('h4', {
            text: 'Impact'
        });
        const impactText = createElement('p', {
            text: project.impact
        });
        impactSection.appendChild(impactLabel);
        impactSection.appendChild(impactText);
        item.appendChild(impactSection);
    }
    
    // Technologies
    if (project.technologies && project.technologies.length > 0) {
        const techSection = createElement('div', {
            class: 'technologies'
        });
        
        project.technologies.forEach(tech => {
            const tag = createTag(tech);
            techSection.appendChild(tag);
        });
        
        item.appendChild(techSection);
    }
    
    // Images
    if (project.images && project.images.length > 0) {
        const gallery = createImageGallery(project.images);
        item.appendChild(gallery);
    }
    
    // Links
    if (project.links && Object.keys(project.links).length > 0) {
        const linksSection = createElement('div', {
            class: 'links'
        });
        
        Object.entries(project.links).forEach(([type, url]) => {
            if (url) {
                const link = createLink(url, type, {
                    class: 'link-button'
                });
                linksSection.appendChild(link);
            }
        });
        
        item.appendChild(linksSection);
    }
    
    return item;
}

/**
 * Create a speaking/event item with gallery
 * @param {Object} event - Speaking event object from config
 * @returns {HTMLElement}
 */
function createSpeakingItem(event) {
    const item = createElement('div', {
        class: 'speaking-item'
    });
    
    // Meta
    const meta = createElement('div', {
        class: 'speaking-meta'
    });
    
    if (event.date) {
        const date = createElement('span', {
            class: 'speaking-date',
            text: event.date
        });
        meta.appendChild(date);
    }
    
    if (event.event) {
        const eventName = createElement('span', {
            class: 'speaking-event',
            text: event.event
        });
        meta.appendChild(eventName);
    }
    
    item.appendChild(meta);
    
    // Title
    const title = createElement('h3', {
        class: 'speaking-title',
        text: event.title
    });
    item.appendChild(title);
    
    // Description
    if (event.description) {
        const desc = createElement('p', {
            class: 'speaking-description',
            text: event.description
        });
        item.appendChild(desc);
    }
    
    // Gallery
    if (event.images && event.images.length > 0) {
        const gallery = createImageGallery(event.images);
        item.appendChild(gallery);
    }
    
    // Links
    if (event.links && Object.keys(event.links).length > 0) {
        const linksSection = createElement('div', {
            class: 'links'
        });
        
        Object.entries(event.links).forEach(([type, url]) => {
            if (url) {
                const link = createLink(url, type, {
                    class: 'link-button'
                });
                linksSection.appendChild(link);
            }
        });
        
        item.appendChild(linksSection);
    }
    
    return item;
}

/**
 * Create a social link icon and link
 * @param {string} platform - Social platform name
 * @param {string} url - Social profile URL
 * @returns {HTMLElement}
 */
function createSocialLink(platform, url) {
    const link = createElement('a', {
        class: `social-link social-${platform}`,
        attrs: {
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': platform
        }
    });
    
    // SVG icons for each platform
    const icons = {
        github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
        youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
        instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 7.313c0 .105.082.19.188.19h1.465a.189.189 0 0 0 .188-.19V5.885a.189.189 0 0 0-.188-.19h-1.465a.189.189 0 0 0-.188.19v1.428zm3.08 5.555c0 3.6-2.956 6.527-6.6 6.527-3.645 0-6.6-2.927-6.6-6.527 0-.779.134-1.528.393-2.229H5.735v6.327c0 .533.437.967.973.967h10.584c.536 0 .973-.434.973-.967V10.084h-1.794c.26.701.394 1.45.394 2.229zm-11.672-3.604c0-1.464 1.194-2.643 2.664-2.643 1.469 0 2.664 1.179 2.664 2.643 0 1.464-1.195 2.643-2.664 2.643-1.47 0-2.664-1.179-2.664-2.643zm10.225-4.455c0 .28-.228.508-.508.508h-.635c-.28 0-.507-.228-.507-.508v-.635c0-.28.228-.507.507-.507h.635c.28 0 .508.227.508.507v.635z"/></svg>'
    };
    
    link.innerHTML = icons[platform] || '';
    
    return link;
}
