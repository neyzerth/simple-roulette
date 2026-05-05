# AGENTS.md

> Compact instructions for OpenCode sessions working on this Roulette app.

## Package Management

- **Use pnpm only.** Never use npm or yarn.
- Lockfile: `pnpm-lock.yaml`

## Development Commands

```bash
# Install dependencies
pnpm install

# Start dev server (metro bundler)
pnpm expo start

# Platform-specific
pnpm expo start --android
pnpm expo start --ios
pnpm expo start --web

# Lint
pnpm lint
```

## Project Structure

- **Framework:** Expo Router v6 (file-based routing)
- **Entry:** `expo-router/entry` (configured in package.json)
- **Routes:** `app/` directory
  - `app/_layout.tsx` - Root layout
  - `app/index.tsx` - Main roulette screen
- **Components:** `components/` - Wheel, Slice, Arrow, WinnerModal
- **Storage:** `storage/` - SQLite wrapper (expo-sqlite)
- **Contexts:** `contexts/` - ItemsContext for state management

## Key Configuration

- **New Architecture:** Enabled (`newArchEnabled: true` in app.json)
- **Typed Routes:** Enabled (experiments.typedRoutes)
- **Path Alias:** `@/*` maps to `./*` (tsconfig.json)
- **Metro Config:** Supports `.wasm` assets

## Tech Stack

- React Native 0.81.5 with React 19
- Expo SDK ~54.0.33
- expo-sqlite for local storage
- react-native-reanimated for wheel animations
- react-native-gesture-handler for touch/drag
- expo-haptics for feedback

## Constraints

- No test suite configured (no Jest/Vitest)
- ESLint only: `expo lint` (expo-config-expo/flat)
- No CI/CD workflows
- Static web export enabled (web.output: static)
