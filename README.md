# Color Sort Game 🎨

A Progressive Web App (PWA) color sorting puzzle game built with React and TypeScript.

## 🎮 Live Demo

The app is now running at: http://localhost:3000

## ✨ Features

- 🎮 Engaging puzzle gameplay - sort colors into tubes
- 📱 Responsive design - works on all devices (mobile, tablet, desktop)
- 🚀 Progressive Web App - installable and works offline
- 🎯 Three difficulty levels (Easy, Medium, Hard)
- 🎨 Beautiful gradient UI with smooth animations
- ⚡ Fast and responsive
- 💾 Offline support with service worker
- 📦 Installable on mobile and desktop

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

### Test production build locally
```bash
npx serve -s build
```

## 📱 PWA Installation

### On Mobile (iOS/Android)
1. Open the app in your browser
2. Tap the "Share" or "Menu" button
3. Select "Add to Home Screen"
4. The app will appear as a standalone app icon

### On Desktop (Chrome/Edge)
1. Open the app in your browser
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

- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS3** - Styling with animations and gradients
- **Service Workers** - PWA offline functionality
- **Web App Manifest** - PWA metadata

## 🎨 Game Features

### Difficulty Levels
- **Easy (3 colors):** 3 colors, 5 tubes total
- **Medium (4 colors):** 4 colors, 6 tubes total  
- **Hard (5 colors):** 5 colors, 7 tubes total

### Visual Features
- Beautiful purple gradient background
- Smooth hover and click animations
- Color tubes with realistic pouring effect
- Win celebration message
- Move counter

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

The app can be deployed to any static hosting service:

### Netlify
```bash
npm run build
# Drag and drop 'build' folder to Netlify
```

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Use gh-pages package or GitHub Actions
```

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

## 📝 License

MIT

---

**Enjoy sorting colors! 🎨**
