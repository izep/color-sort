# Color Sort Game 🎨

A Progressive Web App (PWA) color sorting puzzle game built with React and TypeScript.

## 🎮 Play Now

**Live Demo:** https://izep.github.io/color-sort

## ✨ Features

- 🎮 Engaging puzzle gameplay - sort colors into tubes
- 📱 Responsive design - works on all devices (mobile, tablet, desktop)
- 🚀 Progressive Web App - installable and works offline
- 🎯 Four difficulty levels (Easy, Medium, Hard, Expert)
- 🎨 Bright, distinct colors for better visibility
- ♿ **Colorblind accessibility mode** with patterns and labels
- ⚡ Fast and responsive
- 💾 Offline support with service worker
- 📦 Installable on mobile and desktop
- 🎬 **Sand pouring animations** when moving colors
- 🎵 **Sound effects** for pouring and celebrations
- ✨ **Celebration animations** when completing a tube
- 🎉 **Big celebration** when winning the game

## 🎯 How to Play

1. **Click on a tube** to select it (it will lift up)
2. **Click on another tube** to pour the colors
3. **Rules:**
   - You can only pour if the target tube is empty, OR
   - The top color matches the target tube's top color
   - All consecutive colors of the same type pour at once
4. **Goal:** Sort all colors so each tube contains only one color
5. **Strategy:** Use the two empty tubes wisely!

## 🚀 Quick Start

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm start
```
Opens at http://localhost:3000

### Build for production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## 🎨 Game Features

### Difficulty Levels
- **Easy (4 colors):** 4 colors, 6 tubes, 4 slots per tube
- **Medium (5 colors):** 5 colors, 7 tubes, 4 slots per tube
- **Hard (6 colors):** 6 colors, 8 tubes, 4 slots per tube
- **Expert (7 colors):** 7 colors, 9 tubes, **5 slots per tube** 🔥

### Color Palette
Bright, highly distinct colors:
- 🔴 Bright Red (R)
- 🟢 Bright Green (G)
- 🔵 Bright Blue (B)
- 🟡 Bright Yellow (Y)
- 🟣 Magenta (M)
- 🔵 Cyan (C)
- 🟠 Orange (O)
- 🟣 Purple (P)

### Accessibility Features
**Colorblind Mode** - Toggle with the "👁️ Patterns" button:
- **Letter labels** (R, G, B, Y, M, C, O, P) on each color
- **Unique patterns** for each color:
  - Red: Solid
  - Green: Dots
  - Blue: Diagonal stripes
  - Yellow: Grid
  - Magenta: Diagonal (opposite direction)
  - Cyan: Waves
  - Orange: Circles
  - Purple: Crosshatch
- Patterns remain visible even during animations
- Helps players with all types of color blindness (Deuteranopia, Protanopia, Tritanopia)

### Visual Features
- Beautiful purple gradient background
- **Smooth sand-pouring animations** when moving colors
- **Shake animation** when pouring from a tube
- **Fill animation** when receiving colors
- Color tubes with realistic pouring effect
- **Sparkle celebration** when completing a tube
- **Confetti animation** when winning
- Win celebration message
- Move counter

### Audio Features
- 🎵 **Pour sound** - Descending tone when pouring colors
- 🎵 **Tube complete sound** - Cheerful chord when finishing a tube
- 🎵 **Victory melody** - Uplifting tune when winning the game

## 📂 Project Structure

```
color-sort/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   ├── service-worker.js   # Service worker for offline
│   └── ...
├── src/
│   ├── components/
│   │   ├── Game.tsx        # Main game component
│   │   ├── Game.css        # Game styles
│   │   ├── Tube.tsx        # Tube component
│   │   └── Tube.css        # Tube styles
│   ├── types.ts            # TypeScript interfaces
│   ├── gameLogic.ts        # Game logic and rules
│   ├── App.tsx             # Root component
│   ├── index.tsx           # Entry point with SW registration
│   └── ...
└── package.json
```

## 🚢 Deployment

This app is deployed on **GitHub Pages**: https://izep.github.io/color-sort

To deploy your own version:
```bash
npm run deploy
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for other deployment options.

## 📱 PWA Installation

### On Mobile (iOS/Android)
1. Open https://izep.github.io/color-sort in your browser
2. Tap the "Share" or "Menu" button
3. Select "Add to Home Screen"
4. The app will appear as a standalone app icon

### On Desktop (Chrome/Edge)
1. Open https://izep.github.io/color-sort in your browser
2. Look for the install icon in the address bar
3. Click "Install"
4. The app will open in its own window

## 🛠️ PWA Features

- ✅ Installable on mobile devices and desktop
- ✅ Works offline after first visit
- ✅ Fast loading with service worker caching
- ✅ Standalone app experience (no browser UI)
- ✅ App manifest with theme colors
- ✅ Responsive and mobile-optimized

## 📦 Technologies Used

- **React 19** - UI library
- **TypeScript 4.9** - Type safety
- **CSS3** - Styling with animations and gradients
- **Service Workers** - PWA offline functionality
- **Web App Manifest** - PWA metadata
- **Web Audio API** - Sound effects generation
- **GitHub Pages** - Hosting
- **Accessibility patterns** - Colorblind support

## 🎓 Learning Resources

This project demonstrates:
- React hooks (useState, useEffect)
- TypeScript with React
- Component composition
- Game state management
- CSS animations and transitions
- Progressive Web App implementation
- Service Worker registration
- Responsive design
- GitHub Pages deployment
- **Accessibility patterns for colorblind users**
- **Web Audio API for sound generation**

## 📝 License

MIT

---

**Play now at: https://izep.github.io/color-sort 🎨**
