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
│   ├── Wheel.tsx                 # Main wheel component (renders slices)
│   ├── WheelSlice.tsx            # SVG slice component for wheel segments
│   ├── WheelArrow.tsx            # SVG arrow indicator component
│   ├── WinnerModal.tsx           # Modal to display winning item with confetti
│   ├── ListInputForm.tsx         # Form for creating new lists
│   └── SavedListsPanel.tsx       # Panel displaying saved lists
│
├── contexts/                     # React Context providers
│   └── ItemsContext.tsx          # Global state for wheel items
│
├── hooks/                        # Custom React hooks
│   ├── useWheelSpin.ts           # Hook for wheel rotation animation
│   ├── useWheelGame.ts           # Hook for wheel game state (winner, modal)
│   └── useSavedLists.ts          # Hook for saved lists CRUD operations
│
├── utils/                        # Utility functions
│   ├── wheelMath.ts              # Math utilities for wheel calculations
│   ├── wheelColors.ts            # Wheel slice colors and assignment
│   └── listParser.ts             # Parse text input to list array
│
├── storage/                      # Data persistence layer
│   ├── types.ts                  # Storage type definitions (List interface)
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
- Used by multiple components (Wheel, hooks/useWheelSpin, index screen)

**Custom Hooks** encapsulate business logic:
- `useWheelGame()` - Manages winner state, modal visibility, and spin callback
- `useSavedLists()` - Manages saved lists CRUD operations and form state
- `useWheelSpin()` - Handles wheel rotation animation

### Data Flow

```
User Input (TextInput)
    ↓
ListInputForm → parseTextToList() → ItemsContext.setItems()
    ↓
Wheel component re-renders with new slices
    ↓
User taps wheel → useWheelSpin.spin()
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
App (app/index.tsx)
├── ItemsProvider (context)
│   ├── WinnerModal
│   ├── Pressable (spin trigger)
│   │   ├── WheelArrow
│   │   └── Animated.View
│   │       └── Wheel
│   │           └── WheelSlice[] (SVG paths)
│   ├── ListInputForm
│   │   ├── TextInput (list name)
│   │   └── TextInput (items)
│   └── SavedListsPanel (Scrollable)
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
- **`app/index.tsx`** - Composes hooks and components. ~60 lines of declarative JSX.

### Wheel System
- **`components/Wheel.tsx`** - Renders SVG wheel based on items from context
- **`components/WheelSlice.tsx`** - Individual wheel segment with color and text
- **`components/WheelArrow.tsx`** - Static pointer indicating winning position
- **`hooks/useWheelSpin.ts`** - Hook managing rotation animation and winner calculation
- **`utils/wheelMath.ts`** - Polar coordinate math and winner index calculation
- **`utils/wheelColors.ts`** - Color palette and slice color assignment logic

### Data Layer
- **`storage/types.ts`** - TypeScript interfaces (List with id)
- **`storage/db.ts`** - Low-level storage abstraction (SQLite/localStorage)
- **`storage/crud.ts`** - High-level list operations (get, add, delete with unique ids)
- **`contexts/ItemsContext.tsx`** - React context for current wheel items

### Utilities
- **`utils/listParser.ts`** - Parses comma/newline separated text into array

## Configuration Notes

- **New Architecture**: Enabled (`newArchEnabled: true` in app.json)
- **Typed Routes**: Enabled for type-safe navigation
- **Path Alias**: `@/*` maps to project root for clean imports
- **Web Export**: Static HTML export configured for web builds

## Build Output

The `dist/` directory contains the static web build output (generated via `expo export`).

## Code Style

- **Consistent single quotes** across all files
- **Consistent semicolons** for statement termination
- **Named exports** preferred over default exports
- **`useCallback`** for event handlers passed to child components
- **Custom hooks** for business logic separation
- **Presentational components** receive data via props
