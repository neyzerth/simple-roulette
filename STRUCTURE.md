# Project Structure

> Overview of the Roulette app architecture and file organization.

## Directory Tree

```
roulette/
├── app/                          # Expo Router routes (file-based routing)
│   ├── _layout.tsx               # Root layout - wraps all screens
│   └── index.tsx                 # Main roulette screen (home route)
│
├── components/                   # Reusable React components
│   ├── AnimatedWheel.ts          # Hook for wheel rotation animation logic
│   ├── Arrow.tsx                 # SVG arrow indicator component
│   ├── listInput.ts              # Utility to parse text input to list
│   ├── Slice.tsx                 # SVG slice component for wheel segments
│   ├── useWheelMaths.ts          # Math utilities for wheel calculations
│   ├── Wheel.tsx                 # Main wheel component (renders slices)
│   └── WinnerModal.tsx           # Modal to display winning item with confetti
│
├── contexts/                     # React Context providers
│   └── ItemsContext.tsx          # Global state for wheel items
│
├── storage/                      # Data persistence layer
│   ├── crud.ts                   # CRUD operations for saved lists
│   └── db.ts                     # SQLite/localStorage abstraction
│
├── assets/                       # Static assets
│   └── images/                   # App icons and splash screen images
│
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── metro.config.js               # Metro bundler config (WASM support)
└── eslint.config.js              # ESLint configuration
```

## Architecture Overview

### Routing (Expo Router v6)

The app uses **file-based routing** where files in `app/` automatically become routes:

- `app/_layout.tsx` - Root layout component that wraps all screens with common providers
- `app/index.tsx` - The main screen (accessible at `/`)

### State Management

**ItemsContext** provides global state for the wheel items:
- Stores the array of strings to display on the wheel
- Used by multiple components (Wheel, AnimatedWheel, index screen)

### Data Flow

```
User Input (TextInput)
    ↓
parseTextToList() → ItemsContext.setItems()
    ↓
Wheel component re-renders with new slices
    ↓
User taps wheel → useAnimatedWheel.spin()
    ↓
Animation completes → WinnerModal displays result
```

### Storage Strategy

**Dual storage approach** for cross-platform compatibility:

| Platform | Storage Method |
|----------|---------------|
| iOS/Android | SQLite via `expo-sqlite` |
| Web | localStorage fallback |

The `storage/db.ts` file abstracts this difference, providing a unified `Storage` interface.

### Component Hierarchy

```
Index (app/index.tsx)
├── ItemsProvider (context)
│   ├── WinnerModal
│   ├── Pressable (spin trigger)
│   │   ├── Arrow
│   │   └── Animated.View
│   │       └── Wheel
│   │           └── Slice[] (SVG paths)
│   ├── TextInput (list name)
│   ├── TextInput (items)
│   └── Saved Lists (Scrollable)
```

### Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo-router` | File-based navigation |
| `expo-sqlite` | Local database storage |
| `react-native-reanimated` | Smooth wheel spin animations |
| `react-native-svg` | SVG wheel rendering |
| `react-native-confetti-cannon` | Winner celebration effect |
| `react-native-gesture-handler` | Touch handling (Expo Router dependency) |

## File Responsibilities

### Core Screen
- **`app/index.tsx`** - Main UI with wheel, inputs, and saved lists management

### Wheel System
- **`Wheel.tsx`** - Renders SVG wheel based on items from context
- **`Slice.tsx`** - Individual wheel segment with color and text
- **`Arrow.tsx`** - Static pointer indicating winning position
- **`AnimatedWheel.ts`** - Hook managing rotation animation and winner calculation
- **`useWheelMaths.ts`** - Polar coordinate math and winner index calculation

### Data Layer
- **`storage/db.ts`** - Low-level storage abstraction (SQLite/localStorage)
- **`storage/crud.ts`** - High-level list operations (get, add, delete)
- **`contexts/ItemsContext.tsx`** - React context for current wheel items

### Utilities
- **`components/listInput.ts`** - Parses comma/newline separated text into array

## Configuration Notes

- **New Architecture**: Enabled (`newArchEnabled: true` in app.json)
- **Typed Routes**: Enabled for type-safe navigation
- **Path Alias**: `@/*` maps to project root for clean imports
- **Web Export**: Static HTML export configured for web builds

## Build Output

The `dist/` directory contains the static web build output (generated via `expo export`).
