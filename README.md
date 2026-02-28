# 🎨 Kids Studio - Wonder Island

> An interactive educational web application for children (ages 5-12) featuring **Wonder Island** - a magical learning world with 7 themed zones.

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/MUI-6.4.7-blue.svg)](https://mui.com/)
[![Bundle Size](https://img.shields.io/badge/Bundle-127KB-success.svg)](https://github.com/)

---

## ✨ Features

### 🏝️ Wonder Island (Modern Design)
- **Home Tree** - Central hub with glassmorphic design
- **Math Garden** - Interactive arithmetic and counting games
- **Music Forest** - Musical trees with melody learning
- **Art Studio** - Full-featured drawing with 24 colors & shape stamps
- **Story Beach** - Reading adventures (coming soon)
- **Science Mountain** - Experiments and discoveries (coming soon)
- **Wonder Plaza** - General learning (coming soon)

### 🎯 Core Features
- **Apple-Quality Design** - Glassmorphism, smooth animations, premium UX
- **Profile System** - Multiple user profiles with progress tracking
- **Collection System** - Collect colors, notes, and achievements
- **Adaptive Performance** - Detects device capabilities, adjusts quality
- **Touch Optimized** - Full mouse and touch support
- **Security** - XSS protection, input sanitization, rate limiting

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [OPENSPEC_GUIDELINES.md](../OPENSPEC_GUIDELINES.md) | Architecture, standards, and best practices |
| [CLAUDE_DEVELOPMENT_SKILLS.md](../CLAUDE_DEVELOPMENT_SKILLS.md) | AI development patterns and skills |
| [QUICK_REFERENCE.md](../QUICK_REFERENCE.md) | Quick reference card for common tasks |
| [PRODUCT_VISION.md](../PRODUCT_VISION.md) | Long-term vision and roadmap |

---

## 🛠️ Tech Stack

### Core
- **React 19** + **TypeScript 4.9.5** - Modern, type-safe UI
- **Material-UI 6.4.7** - Component library
- **Framer Motion 12.5.0** - Smooth animations
- **React Router 7.3.0** - Client-side routing

### Performance
- **Lazy Loading** - 41 code-split chunks (53.6% bundle reduction)
- **Memoization** - Optimized re-renders
- **Adaptive Quality** - Detect low-end devices

### Security
- **XSS Protection** - Input sanitization
- **Rate Limiting** - Prevent abuse
- **Safe Storage** - Sanitized localStorage operations

---

## 📁 Project Structure

```
kids-studio/
├── src/
│   ├── pages/world/          # Wonder Island zones (modern)
│   │   ├── HomeTreePageV2.tsx
│   │   ├── MathGardenPage.tsx
│   │   ├── MusicForestPage.tsx
│   │   ├── ArtMeadowPageV2.tsx
│   │   └── ...
│   ├── contexts/             # State management
│   │   ├── WorldContext.tsx  # Primary context
│   │   └── AppContext.tsx    # Legacy context
│   ├── utils/                # Utilities
│   │   ├── security.ts       # XSS protection, validation
│   │   ├── performance.ts    # Debounce, throttle, memoize
│   │   ├── logger.ts         # Logging system
│   │   └── storage.ts        # Safe localStorage
│   ├── components/           # Reusable components
│   ├── data/                 # Static data
│   └── App.tsx               # Main app with lazy loading
├── public/                   # Static assets
├── OPENSPEC_GUIDELINES.md    # Architecture guide
├── CLAUDE_DEVELOPMENT_SKILLS.md  # AI development patterns
├── QUICK_REFERENCE.md        # Quick reference
└── README.md                 # This file
```

---

## 🎨 Design System

### Glassmorphism Pattern
All UI elements use modern glassmorphic design:
```typescript
background: alpha('#ffffff', 0.15)
backdropFilter: 'blur(20px) saturate(180%)'
border: 2px solid alpha('#ffffff', 0.3)
```

### Zone Gradients
```typescript
Home Tree:       '#667eea → #764ba2' (Purple)
Math Garden:     '#f093fb → #f5576c' (Pink)
Music Forest:    '#f093fb → #f5576c → #BB8FCE' (Pink-Purple)
Art Studio:      '#4facfe → #00f2fe → #43e97b' (Blue-Cyan-Green)
```

### Animations
- **Spring Physics** - Natural, smooth motion
- **Staggered Entrance** - Elements animate in sequence
- **Glow Effects** - Interactive feedback
- **Floating Particles** - Ambient background animations

---

## 🔐 Security

All user inputs are sanitized to prevent XSS attacks:

```typescript
import { sanitizeInput, rateLimiter } from './utils/security';

// Sanitize user input
const handleInput = (e) => {
  const safe = sanitizeInput(e.target.value);
  setValue(safe);
};

// Rate limit actions
if (!rateLimiter.isAllowed('save', 10, 60000)) {
  showError('Too many attempts');
  return;
}
```

---

## ⚡ Performance

### Bundle Optimization
- **Before**: 275.73 KB (single bundle)
- **After**: 127.71 KB (41 lazy chunks)
- **Improvement**: 53.6% reduction

### Adaptive Quality
Automatically detects device capabilities:
```typescript
import { getQualitySettings } from './utils/performance';

const quality = getQualitySettings();
// { animations, particles, shadows, blur }
```

---

## 🎯 Development

### Adding a New Zone

1. **Create page file**:
   ```bash
   touch src/pages/world/NewZonePage.tsx
   ```

2. **Copy zone template** from [QUICK_REFERENCE.md](../QUICK_REFERENCE.md)

3. **Add lazy loading in App.tsx**:
   ```typescript
   const NewZonePage = lazy(() => import('./pages/world/NewZonePage'));
   ```

4. **Add route**:
   ```typescript
   <Route path="/world/new-zone" element={<NewZonePage />} />
   ```

5. **Test**:
   ```bash
   npm run build
   ```

### Code Standards

- ✅ TypeScript types for all props/state
- ✅ Input sanitization with `sanitizeInput()`
- ✅ Lazy loading for pages
- ✅ Memoization for expensive operations
- ✅ Glassmorphism design pattern
- ✅ Error handling with try-catch
- ✅ useEffect cleanup functions

See [OPENSPEC_GUIDELINES.md](../OPENSPEC_GUIDELINES.md) for detailed standards.

---

## 📊 Status

### Wonder Island Progress: 4/7 Zones Complete (57%)

- ✅ **Home Tree V2** - Modern hub with zone navigation
- ✅ **Math Garden V2** - Interactive arithmetic games
- ✅ **Music Forest V2** - Musical trees and melodies
- ✅ **Art Studio V2** - Drawing with 24 colors & shapes
- ⏳ **Story Beach** - Reading adventures (pending)
- ⏳ **Science Mountain** - Experiments (pending)
- ⏳ **Wonder Plaza** - General learning (pending)

### Build Status
```bash
✅ Bundle Size: 127.71 KB (53.6% smaller)
✅ TypeScript: No errors
✅ Tests: Passing
✅ Lazy Loading: 41 chunks active
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Follow code standards in [OPENSPEC_GUIDELINES.md](../OPENSPEC_GUIDELINES.md)
4. Commit changes (`git commit -m 'feat: add amazing feature'`)
5. Push branch (`git push origin feature/amazing`)
6. Open Pull Request

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Build/tools

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- Material-UI for component library
- Framer Motion for animations
- React community for best practices
- Kids and parents for feedback and inspiration

---

**Made with ❤️ for kids to learn and explore!**

🎨 ✨ 🎵 📚 🔬 🎮 🌈

