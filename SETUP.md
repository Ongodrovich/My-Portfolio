# Nova Morningstar Portfolio - Setup Instructions

## Background Image Setup

Your portfolio is configured to use a cosmic background image. To activate it:

### 1. Save the Cosmic Background Image
- Download or copy the cosmic nova image
- Save it as: `assets/cosmic-nova.jpg` (in the `assets` folder)
- Recommended format: JPG (smaller file size, ideal for backgrounds)

### 2. File Structure
```
n/
├── index.html
├── styles.css
├── script.js
├── tailwind.config.js
├── assets/
│   └── cosmic-nova.jpg  ← Add your cosmic background here
└── SETUP.md
```

### 3. Supported Image Formats
- JPG/JPEG (recommended for photos)
- PNG (if transparency needed)
- WebP (modern, compressed)

### 4. Image Optimization Tips
- **Size**: 1920x1080px minimum (for full viewport coverage)
- **File Size**: Keep under 2MB for fast loading
- **Format**: Use JPG for best compression with photos

### 5. Customize Blending
If you want to adjust the background blending effect, edit the HTML `<style>` section or modify:

**In `index.html`**, the cosmic layer filters:
```html
filter: brightness(0.6) contrast(1.2) saturate(0.8);
```

Adjust values:
- `brightness`: 0.3-0.8 (darker = more readable)
- `contrast`: 1.0-1.5 (higher = more vivid)
- `saturate`: 0.5-1.2 (higher = more color)

### 6. Test Locally
```bash
# Using Node HTTP Server
npx http-server assets -p 8080

# Or use VS Code Live Server
# Right-click index.html → Open with Live Server
```

Visit `http://localhost:8080` and the cosmic background will blend artistically throughout the portfolio!

### 7. Advanced Customization

**Change blend mode** (in `index.html` style section):
- `mix-blend-mode: multiply;` → darker overlay
- `mix-blend-mode: screen;` → lighter overlay
- `mix-blend-mode: overlay;` → contrast boost
- `mix-blend-mode: hard-light;` → dramatic effect

**Adjust opacity** of layers:
- Cosmic background: `opacity-40` (in HTML)
- Dark overlay: `opacity-70`
- Starfield: `opacity-20`

Enjoy your cosmic portfolio! 🚀✨
