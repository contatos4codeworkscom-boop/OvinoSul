# OvinoSul - Criação de Ovinos no Rio Grande do Sul

## 📋 Project Overview
OvinoSul is a professional static website dedicated to sheep farming in Rio Grande do Sul, Brazil. It provides comprehensive information about sheep breeds, vaccination calendars, and practical management tips for farmers in the region.

**Type**: Static HTML/CSS/JavaScript Website (PWA)
**Language**: Portuguese (pt-BR)
**Target Audience**: Sheep farmers and ranchers in Rio Grande do Sul, Brazil

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript ES6+
- **Server**: Python 3.11 HTTP server (for development)
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **PWA**: Service Worker for offline support

### Project Structure
```
/
├── index.html              # Main homepage
├── racas.html             # Breeds page
├── vacinas.html           # Vaccination calendar page
├── styles.css             # Main styles with CSS variables
├── modern-navigation.css  # Navigation styles
├── hero.css               # Hero section styles
├── features.css           # Features section styles
├── buttons.css            # Button system styles
├── mobile.css             # Mobile-responsive styles
├── racas.css              # Breeds page styles
├── vacinas.css            # Vaccination page styles
├── script.js              # Main JavaScript
├── modern-navigation.js   # Navigation functionality
├── advanced-scroll-controller.js  # Scroll effects
├── racas.js               # Breeds page functionality
├── vacinas.js             # Vaccination page functionality
├── carousel.js            # Carousel functionality
├── sw.js                  # Service worker
├── manifest.json          # PWA manifest
├── hero.jpg               # Hero background image
├── favicon.svg            # Site icon
└── server.py              # Python HTTP server
```

## 🚀 Running the Project

### Development Server
The project uses a simple Python HTTP server that:
- Serves static files on port 5000
- Binds to 0.0.0.0 for Replit compatibility
- Sets Cache-Control headers to prevent caching issues in Replit's iframe

**Command**: `python3 server.py`

### Workflow Configuration
- **Workflow Name**: frontend
- **Command**: python3 server.py
- **Output Type**: webview (web preview)
- **Port**: 5000

## 🎨 Design System

### Color Palette
- **Primary**: #0F172A (Professional dark blue)
- **Accent**: #2563EB (Vibrant blue)
- **Earthy**: #D97706 (Earthy orange)
- **Success**: #059669 (Green)

### Typography
- **Display**: Playfair Display (headings)
- **Body**: Inter (general text)

### Breakpoints
- Mobile: ≤ 480px
- Mobile Large: 481px - 768px
- Tablet: 769px - 1024px
- Desktop: ≥ 1025px

## ✨ Features

1. **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
2. **Modern Navigation**: Sticky header with mobile hamburger menu
3. **Hero Section**: Full-width hero with search functionality
4. **Breed Profiles**: Detailed information about 15+ sheep breeds
5. **Vaccination Calendar**: Comprehensive vaccination schedule for Rio Grande do Sul
6. **PWA Support**: Service worker for offline functionality
7. **Accessibility**: WCAG 2.1 AA compliant
8. **Performance**: Optimized with lazy loading and prefetching

## 📦 Dependencies

### System Dependencies
- Python 3.11 (for HTTP server)

### External Resources
- Google Fonts (Inter, Playfair Display) - loaded via CDN

## 🔧 Recent Changes
- **2025-11-02**: Initial setup in Replit environment
  - Installed Python 3.11
  - Created HTTP server with cache-control headers
  - Configured workflow for port 5000
  - Set up project documentation

## 🎯 User Preferences
None specified yet.

## 📝 Notes
- This is a static website with no backend database or API
- All content is hardcoded in HTML files
- Service worker provides offline support for PWA functionality
- The Python server is only for development; for production deployment, any static file server will work
