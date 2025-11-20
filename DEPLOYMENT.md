# Deployment Guide - Color Sort PWA

## 🚀 Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify Drop:**
   - Go to https://app.netlify.com/drop
   - Drag and drop the `build` folder
   - Done! Your app is live instantly

3. **Or use Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=build
   ```

**Free tier includes:**
- Custom domain
- HTTPS (required for PWA)
- Automatic CDN
- Continuous deployment

---

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Or connect GitHub:**
   - Push to GitHub
   - Import project on https://vercel.com
   - Auto-deploy on push

---

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/color-sort",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

---

### Option 4: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize:**
   ```bash
   firebase init hosting
   # Select "build" as public directory
   # Configure as single-page app: Yes
   ```

3. **Deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

---

### Option 5: AWS Amplify

1. **Install Amplify CLI:**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize and deploy:**
   ```bash
   amplify init
   amplify add hosting
   amplify publish
   ```

---

### Option 6: Render

1. **Create `render.yaml`:**
   ```yaml
   services:
     - type: web
       name: color-sort
       env: static
       buildCommand: npm install && npm run build
       staticPublishPath: build
   ```

2. **Connect GitHub repo on https://render.com**

---

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally: `npx serve -s build`
- [ ] Verify PWA manifest.json is correct
- [ ] Check service worker is registered
- [ ] Test on mobile device (responsive)
- [ ] Verify offline functionality works
- [ ] Check console for errors
- [ ] Test install prompt (Chrome/Edge)

---

## 🔧 Important Configuration

### For PWA to work properly:

1. **HTTPS Required**
   - All free hosting providers include HTTPS
   - Service workers require secure context

2. **Manifest.json**
   - Already configured at `/public/manifest.json`
   - Update icons if needed (currently using React defaults)

3. **Service Worker**
   - Already set up in production build
   - Caches assets automatically
   - Enables offline functionality

---

## 🌐 Custom Domain Setup

### Netlify
```bash
# In Netlify dashboard:
Settings → Domain management → Add custom domain
```

### Vercel
```bash
vercel domains add yourdomain.com
```

### GitHub Pages
```
Settings → Pages → Custom domain
```

---

## 📱 Testing PWA After Deploy

### Desktop (Chrome/Edge)
1. Visit your deployed URL
2. Look for install icon in address bar
3. Click "Install"
4. App opens in standalone window

### Mobile (Android)
1. Visit URL in Chrome
2. Tap menu (⋮) → "Install app" or "Add to Home screen"
3. App icon appears on home screen

### Mobile (iOS)
1. Visit URL in Safari
2. Tap Share button
3. "Add to Home Screen"
4. App icon appears on home screen

---

## 🎯 Recommended: Netlify

**Why Netlify?**
- ✅ Drag-and-drop deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free custom domain
- ✅ Continuous deployment from Git
- ✅ Zero configuration needed
- ✅ Perfect for PWAs

**Deploy in 30 seconds:**
1. `npm run build`
2. Drag `build` folder to netlify.com/drop
3. Done!

---

## 🔍 Troubleshooting

### PWA not installing?
- Ensure HTTPS is enabled
- Check manifest.json is accessible
- Verify service worker registered (DevTools → Application)

### Offline not working?
- Clear cache and reload
- Check service worker in DevTools
- Verify build includes service-worker.js

### 404 on refresh?
- Configure hosting for SPA (redirect all to index.html)
- Most platforms handle this automatically

---

## 📊 Analytics (Optional)

Add Google Analytics:
```bash
npm install react-ga4
```

See documentation for integration.

---

**Choose a platform and deploy! Your Color Sort PWA is ready! 🚀**
