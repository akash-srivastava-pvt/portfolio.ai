# Developer Portfolio - Static SPA

A premium, production-quality developer portfolio website built with **pure HTML, CSS, and vanilla JavaScript**. Completely static, no build tools, no frameworks, no backend. Perfect for GitHub Pages deployment.

## ✨ Features

- **Pure HTML5, CSS3, Vanilla JavaScript** - No frameworks, no dependencies
- **JSON-driven content** - Manage everything from `config.json`
- **Single Page Application (SPA)** - Hash-based navigation with browser back/forward support
- **Responsive design** - Beautiful on mobile (320px) through ultra-wide displays (1920px+)
- **Dark/Light theme** - Theme toggle with localStorage persistence
- **Accessibility-first** - Semantic HTML, ARIA labels, keyboard navigation, focus states
- **Performance-optimized** - Lazy-loaded images, minimal JavaScript, clean CSS
- **GitHub Pages ready** - Works from repository subdirectories
- **No build step** - Run directly in the browser, works on `file://` with local HTTP server

## 📁 Project Structure

```
developer-portfolio/
├── index.html              # Application shell
├── config.json             # Content configuration
├── README.md               # This file
│
├── css/
│   ├── style.css           # Main styles & components
│   └── responsive.css      # Responsive design
│
├── js/
│   ├── app.js              # Main orchestration
│   ├── config.js           # Config loading & management
│   ├── components.js       # Reusable components
│   └── navigation.js       # SPA navigation
│
└── assets/
    ├── profile.jpg         # Your profile photo
    ├── favicon.svg         # Site favicon
    ├── career/             # Career timeline images
    ├── engineering/        # Engineering project images
    ├── thought-leadership/ # Articles/talks images
    ├── ai/                 # AI/LLM project images
    ├── innovations/        # Innovation images
    ├── open-source/        # Open source project images
    ├── speaking/           # Speaking event photos
    └── building/           # Personal project images
```

## 🚀 Getting Started

### 1. Local Development

#### Using Python 3 (recommended):
```bash
cd developer-portfolio
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

#### Using Node.js:
```bash
npx http-server
```

#### Using PHP:
```bash
php -S localhost:8000
```

**Why?** The `fetch()` API doesn't work with `file://` URLs for security reasons. A local HTTP server simulates the GitHub Pages environment.

### 2. Configure Your Content

Edit `config.json` to customize your portfolio:

```json
{
  "site": {
    "title": "Your Name - Developer",
    "description": "Your professional tagline"
  },
  "profile": {
    "name": "Your Name",
    "title": "Software Engineer · AI Engineer · Builder",
    "image": {
      "src": "assets/profile.jpg",
      "alt": "Your name"
    }
  },
  "social": {
    "github": "https://github.com/yourprofile",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "youtube": "https://youtube.com/@yourprofile",
    "instagram": ""
  },
  "about": {
    "headline": "Your headline here",
    "description": "Your bio here",
    "focus": ["Tag 1", "Tag 2", "Tag 3"],
    "location": "City, Country",
    "status": "Currently building..."
  },
  "professionalCareer": [ /* ... */ ],
  "engineeringExperience": [ /* ... */ ],
  "thoughtLeadership": [ /* ... */ ],
  "speakingWritingCommunity": [ /* ... */ ],
  "aiLlmWork": [ /* ... */ ],
  "innovations": [ /* ... */ ],
  "openSource": [ /* ... */ ],
  "personalBuilding": [ /* ... */ ],
  "footer": {
    "copyright": "© 2026 Your Name",
    "sourceUrl": "https://github.com/yourprofile/portfolio"
  }
}
```

### 3. Add Your Images

Place images in the appropriate `assets/` subdirectories:

- **`assets/profile.jpg`** - Your professional headshot (recommended: 400x400px, square)
- **`assets/career/`** - Career timeline photos
- **`assets/engineering/`** - Engineering project screenshots/diagrams
- **`assets/thought-leadership/`** - Article thumbnails, talk covers
- **`assets/ai/`** - AI/LLM project images
- **`assets/innovations/`** - Innovation project visuals
- **`assets/open-source/`** - Open source project images
- **`assets/speaking/`** - Conference/event photos
- **`assets/building/`** - Personal project images

**Image recommendations:**
- Keep images optimized (use tools like ImageOptim, TinyPNG)
- Use modern formats (WebP with JPEG fallback)
- Aim for reasonable file sizes (< 500KB for full images)
- Lazy loading is built-in

## 📋 Configuration Schema

### Career Entry
```json
{
  "id": "unique-id",
  "company": "Company Name",
  "role": "Job Title",
  "startDate": "2024",
  "endDate": "Present",
  "location": "City, Country",
  "description": "What you did",
  "achievements": ["Achievement 1", "Achievement 2"],
  "responsibilities": ["Responsibility 1", "Responsibility 2"],
  "technologies": ["Tech1", "Tech2"],
  "images": [],
  "links": {}
}
```

### Engineering Experience
```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Overview",
  "problem": "The problem solved",
  "approach": "How it was solved",
  "architecture": "System design",
  "impact": "Results achieved",
  "metrics": [
    { "value": "10M+", "label": "events/day" }
  ],
  "technologies": ["Tech1", "Tech2"],
  "images": [],
  "links": {
    "github": "https://github.com/...",
    "demo": "https://..."
  }
}
```

### Thought Leadership
```json
{
  "id": "unique-id",
  "type": "article",
  "title": "Article Title",
  "date": "2026-08",
  "description": "Short summary",
  "tags": ["tag1", "tag2"],
  "image": {
    "src": "assets/thought-leadership/img.jpg",
    "alt": "Description"
  },
  "url": "https://example.com"
}
```

### Project/Innovation
```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "What it is",
  "status": "active",
  "problem": "The problem",
  "approach": "The solution",
  "impact": "The results",
  "technologies": ["Tech1", "Tech2"],
  "images": [],
  "links": {
    "github": "https://github.com/...",
    "demo": "https://example.com"
  }
}
```

### Speaking/Event
```json
{
  "id": "unique-id",
  "type": "conference-talk",
  "title": "Talk Title",
  "event": "Conference Name",
  "date": "2026-09",
  "description": "Talk summary",
  "images": [
    {
      "src": "assets/speaking/photo.jpg",
      "alt": "Description",
      "caption": "Optional caption"
    }
  ],
  "links": {
    "slides": "https://...",
    "video": "https://..."
  }
}
```

## 🌐 Navigation Structure

The portfolio has **4 main sections**:

1. **Professional Journey** - Career timeline + engineering experience
2. **Thought Leadership** - Articles, talks, publications, community work
3. **Innovations** - AI/LLM systems + innovation projects
4. **Personal Building** - Open source + personal experiments

Navigation is hash-based (no server required):
- `index.html#journey`
- `index.html#thought-leadership`
- `index.html#innovations`
- `index.html#building`

Default section: Professional Journey

## 🎨 Customization

### Colors & Theme

Edit CSS variables in [css/style.css](css/style.css) under `:root`:

```css
:root {
    --background: #ffffff;
    --surface: #f7f7f7;
    --text-primary: #111111;
    --accent: #0066cc;
    /* ... */
}

html[data-theme='dark'] {
    --background: #0a0a0a;
    --text-primary: #fafafa;
    /* ... */
}
```

### Typography

Modify font sizes, weights, and line heights:

```css
--font-size-lg: 1.125rem;
--font-weight-bold: 700;
--line-height-normal: 1.5;
```

### Spacing

Adjust padding and margins:

```css
--space-lg: 1.5rem;
--space-xl: 2rem;
```

### Breakpoints

Responsive breakpoints in [css/responsive.css](css/responsive.css):

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1199px
- **Large Desktop**: 1200px+
- **Ultra Wide**: 1920px+

## 📱 Responsive Behavior

The portfolio is **mobile-first**:

### Mobile (< 768px)
- Single column layout
- Profile at top
- Full-width content
- Stacked cards
- Horizontal scrolling navigation

### Tablet (768px - 1023px)
- Compact sidebar (no sticky)
- Primary content column
- 2-column grids where appropriate
- Touch-optimized tap targets

### Desktop (1024px+)
- Sticky sidebar (max 100vh)
- Main content alongside
- Multi-column grids
- Full visual hierarchy

## ♿ Accessibility

The portfolio includes:

- ✅ Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, etc.)
- ✅ Proper heading hierarchy
- ✅ Alt text for all images
- ✅ ARIA labels for interactive elements
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus states (visible outlines)
- ✅ Color contrast (WCAG AA)
- ✅ Reduced motion support
- ✅ Touch-friendly tap targets (44px minimum)

Test with:
- Screen readers (NVDA, JAWS)
- Keyboard-only navigation
- Browser accessibility inspector

## 🚀 Deployment

### GitHub Pages

1. Create a repository named `portfolio` (or any name)

2. Push your files:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourprofile/portfolio.git
git push -u origin main
```

3. In repository settings:
   - Go to **Settings** → **Pages**
   - Select **Deploy from a branch**
   - Choose **main** branch, **root** folder
   - Click **Save**

4. Your portfolio is live at:
   - `https://yourprofile.github.io/portfolio/`

**Important**: The portfolio works correctly from **repository subdirectories**. All paths are relative (e.g., `./css/style.css`), not absolute (`/css/style.css`).

### Custom Domain

1. In repository settings → **Pages**
2. Under "Custom domain", enter your domain (e.g., `portfolio.example.com`)
3. Create a `CNAME` file in your repository root:
   ```
   portfolio.example.com
   ```
4. Configure your domain's DNS to point to GitHub Pages

See [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

### Other Hosting

Works anywhere that serves static files:
- Netlify
- Vercel
- AWS S3
- Any static hosting service
- Your own server

## 🔒 Security

- ✅ No external dependencies (smaller attack surface)
- ✅ Content Security Policy friendly
- ✅ No inline scripts (all external)
- ✅ Links use `target="_blank"` + `rel="noopener noreferrer"`
- ✅ XSS protection (uses `textContent`, not `innerHTML` for user data)
- ✅ HTTPS ready (GitHub Pages enforces HTTPS)

## 📊 Performance

Target metrics:
- **Lighthouse Performance**: ≥ 95
- **Lighthouse Accessibility**: ≥ 95
- **Lighthouse Best Practices**: ≥ 95
- **Lighthouse SEO**: ≥ 95

Optimizations included:
- Lazy image loading
- Minimal JavaScript
- No external dependencies
- Optimized CSS
- No render-blocking resources
- Efficient DOM updates

## 🔍 SEO

Includes:
- Semantic HTML structure
- Open Graph metadata
- Twitter Card metadata
- Structured data markup
- Mobile viewport configuration
- Page title & description
- Author metadata

## 🎯 Best Practices

### Content Management

1. **Keep `config.json` organized**
   - Validate JSON before deploying
   - Use consistent date formats
   - Complete all optional fields or remove them

2. **Image optimization**
   ```bash
   # macOS
   brew install imagemagick
   mogrify -resize 1200x1200 assets/**/*.jpg
   
   # Linux
   apt-get install imagemagick
   mogrify -resize 1200x1200 assets/**/*.jpg
   ```

3. **Use meaningful links**
   - External links should be permanent
   - Test all links before deploying
   - Use descriptive link text

### Maintenance

1. Keep `config.json` up to date
2. Remove old content as it becomes irrelevant
3. Update project status badges
4. Check broken images
5. Test on multiple devices before pushing

## 💡 Tips & Tricks

### Show/Hide Sections
If a subsection is empty (e.g., no `aiLlmWork` items), that subsection won't render. This keeps the UI clean.

### Empty Sections
If an entire section is empty, it will show "Coming soon" message.

### Image Galleries
The gallery system automatically adapts:
- 0 images: Text-only layout
- 1 image: Side-by-side on desktop
- 2+ images: Responsive grid

### Status Badges
Project statuses: `active`, `shipped`, `building`, `experiment`, `paused`, `learning`

Each has unique styling to communicate status at a glance.

### Technology Tags
Keep technology tags concise:
- ✅ "React", "PostgreSQL", "AWS"
- ❌ "React Library for Building User Interfaces"

## 🔧 Troubleshooting

### "config.json" not loading
- Ensure you're running a local HTTP server
- Check browser console for CORS errors
- Validate JSON syntax

### Styling looks wrong
- Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Clear cache
- Check that CSS files are loading

### Images not showing
- Verify paths are relative (e.g., `assets/profile.jpg`)
- Check image files exist
- Inspect Network tab in DevTools

### Theme toggle not working
- Check localStorage is enabled
- Verify CSS variables are defined
- Look for JavaScript errors in console

### Navigation not working
- Check hash is correct (`#journey`, not `#professional-journey`)
- Verify `config.json` is loaded
- Check browser supports `hashchange` event (all modern browsers)

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## 📝 License

This portfolio template is open source. Use it freely for your own portfolio.

## 🤝 Contributing

Found a bug or have a suggestion? Create an issue or pull request!

---

**Built with pure HTML, CSS, and JavaScript** ✨

No frameworks. No dependencies. Just code.
