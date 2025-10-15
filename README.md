# Hammozo App

A production-ready React Native TypeScript application featuring authentication, auto-lock security, offline support, and optimized list performance.

## Features

### Core Functionality
- **Authentication**: DummyJSON API integration with token-based auth
- **Biometric Unlock**: Face ID/Touch ID with password fallback
- **Auto-Lock**: 10-second inactivity timeout and background lock
- **Product Lists**: All products and category-filtered views with pull-to-refresh
- **Superadmin Mode**: Product deletion for designated admin users
- **Offline Support**: React Query cache persistence with MMKV
- **Network Status**: Visual offline banner when disconnected

### Performance Optimizations
- **List Performance**: `getItemLayout`, stable keys, memoized components
- **Cold Start**: MMKV-persisted cache for instant list rendering
- **Minimal Dependencies**: Carefully selected, lightweight libraries
- **Optimistic Updates**: Immediate UI feedback for delete operations

## Configuration

### App Settings (src/utils/constants.ts)
```typescript
CHOSEN_CATEGORY = "smartphones"        // Category screen filter
SUPERADMIN_USERNAME = "emilys"        // User with delete permissions
AUTO_LOCK_TIMEOUT_MS = 10000          // 10 seconds inactivity
```

### Test Credentials
- **Username**: `emilys`
- **Password**: `emilyspass`
- **Superadmin**: `emilys` (can delete products from All Products screen)

## Getting Started

### Prerequisites
- Node.js >= 20
- React Native development environment ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))
- iOS: Xcode, CocoaPods, Ruby bundler
- Android: Android Studio, JDK

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **iOS only: Install CocoaPods**
```bash
cd ios && bundle exec pod install && cd ..
```

### Running the App

1. **Start Metro bundler**
```bash
npm start
```

2. **Run on platform** (in a new terminal)

**Android**
```bash
npm run android
```

**iOS**
```bash
npm run ios
```

### Development Commands
```bash
npm run lint          # Run ESLint
npm test             # Run Jest tests
npm start            # Start Metro bundler
```

## Architecture

### Project Structure
```
src/
├── app/
│   ├── AppProvider.tsx           # Root provider (Redux, React Query, Navigation)
│   └── navigation/
│       └── RootNavigator.tsx     # Auth-based navigation
├── features/
│   ├── auth/                     # Authentication feature
│   │   ├── api.ts                # Login, getCurrentUser API
│   │   ├── slice.ts              # Redux auth state
│   │   ├── hooks.ts              # useAuth, useRestoreSession
│   │   └── components/
│   │       └── LoginForm.tsx
│   ├── lock/                     # Auto-lock feature
│   │   ├── useAutoLock.ts        # Inactivity timer & AppState handling
│   │   └── LockOverlay.tsx       # Biometric/password unlock modal
│   ├── products/                 # Products feature
│   │   ├── api/
│   │   │   ├── api.ts            # Product CRUD operations
│   │   │   └── queries.ts        # React Query hooks
│   │   ├── components/
│   │   │   ├── ProductItem.tsx   # Memoized list item
│   │   │   └── ProductList.tsx   # Optimized FlatList
│   │   └── screens/
│   │       ├── AllProductsScreen.tsx
│   │       └── CategoryScreen.tsx
│   └── offline/
│       └── OfflineBanner.tsx     # Network status indicator
├── services/
│   ├── http.ts                   # Axios instance with interceptors
│   ├── queryClient.ts            # React Query + MMKV persistence
│   ├── storage.ts                # MMKV wrapper
│   └── biometric.ts              # Biometric auth helpers
├── screens/
│   ├── LoginScreen.tsx
│   └── Tabs.tsx                  # Bottom tabs navigation
├── theme/
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
└── utils/
    ├── constants.ts              # App configuration
    └── types.ts                  # Zod schemas & TypeScript types
```

### Key Technical Decisions

#### 1. **MMKV for Storage**
- **Why**: Faster than AsyncStorage, synchronous API
- **Use**: Auth tokens, React Query cache persistence
- **Trade-off**: Slightly larger binary size vs AsyncStorage

#### 2. **React Query with Persistence**
- **Why**: Instant offline list rendering, smart cache invalidation
- **Implementation**: `createSyncStoragePersister` with MMKV
- **Config**: 60s staleTime, 5min gcTime, refetch on reconnect only

#### 3. **Optimized FlatList**
- **getItemLayout**: Fixed 80px row height for instant scrolling
- **removeClippedSubviews**: Reduce memory for long lists
- **windowSize: 7**: Balance between memory and scroll smoothness
- **Memoized components**: Prevent unnecessary re-renders

#### 4. **Auto-Lock Implementation**
- **Inactivity**: 10s timer reset on touch events via Pressable wrapper
- **Background**: Immediate lock on AppState inactive/background
- **Unlock Flow**: Biometric → Password fallback

#### 5. **Redux Toolkit (Minimal)**
- **Why**: Only for auth state, no overkill
- **Manual Persistence**: Direct MMKV calls (no redux-persist)
- **Trade-off**: Lightweight but requires manual hydration

#### 6. **Axios with Interceptors**
- **Request**: Auto-attach Bearer token from Redux
- **Response**: Handle 401 → auto-logout
- **Why**: More features than fetch, but heavier

## Dependency Justification

### Core (Production)
- `react-native-mmkv` (3.1.0): Fast synchronous storage
- `@tanstack/react-query` (5.x): Data fetching & caching
- `@reduxjs/toolkit` (2.x): Auth state management
- `react-navigation` (7.x): Navigation stack & tabs
- `axios` (1.7.x): HTTP client with interceptors
- `react-native-biometrics` (3.x): Face ID/Touch ID
- `@react-native-community/netinfo` (12.x): Network status
- `zod` (3.x): Runtime validation (dev only in prod builds)

### Dev Dependencies
- TypeScript: Strict mode enabled
- ESLint: React Native + TypeScript rules
- Jest: Unit & component tests

**Total Dependency Count**: 9 production, 3 dev essentials

## Testing

Run tests:
```bash
npm test
```

Coverage includes:
- Auth slice reducers
- ProductItem rendering
- (Expand with integration tests as needed)

## Performance Notes

### Cold Start Optimization
1. **MMKV Persisted Cache**: Lists render immediately from cached data
2. **Lazy Screen Loading**: React Navigation code-splitting
3. **Minimal Initial Render**: Providers wrap only necessary components

### List Performance Metrics
- **initialNumToRender**: 10-12 items
- **maxToRenderPerBatch**: 12 items
- **updateCellsBatchingPeriod**: Default (50ms)
- **Fixed Item Height**: 80px for `getItemLayout` optimization

### Memory Management
- `removeClippedSubviews`: Enabled for long lists
- `windowSize: 7`: Keep 7 screens worth of items in memory
- Image loading: Fixed dimensions to avoid layout thrashing

## Known Limitations & Future Improvements

### Current Limitations
1. **Biometric Re-prompt**: No automatic retry if user cancels initially
2. **Delete Rollback**: Simple rollback without detailed error messaging
3. **No Pagination**: All products loaded at once (DummyJSON limitation)
4. **Hardcoded Category**: Only one category screen (easily extendable)

### If I Had More Time
1. **Enhanced Error Handling**: Toast notifications, better error boundaries
2. **Deep Linking**: Handle product URLs from external sources
3. **Pull-to-Refresh Animation**: Custom animated indicator
4. **Dark Mode**: Full theme switching support
5. **E2E Tests**: Detox or Maestro integration tests
6. **Analytics**: Track user interactions and performance metrics
7. **Image Caching**: react-native-fast-image for better performance
8. **Accessibility**: Full VoiceOver/TalkBack support
9. **Crash Reporting**: Sentry or Firebase Crashlytics
10. **CI/CD**: GitHub Actions for automated builds and tests

## Troubleshooting

### iOS Pod Install Fails
```bash
cd ios
bundle exec pod repo update
bundle exec pod install --repo-update
cd ..
```

### Android Build Errors
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Metro Bundler Cache Issues
```bash
npm start -- --reset-cache
```

### Biometrics Not Working (Simulator)
- iOS Simulator: Biometrics always available (mocked)
- Android Emulator: Enable fingerprint in device settings
- Use "Use Password" fallback for testing

## License

MIT

## Author

Generated for production use with performance and reliability in mind.
