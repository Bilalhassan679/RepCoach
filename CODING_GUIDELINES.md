# RepCoach — React Native CLI Coding Guidelines & Optimization Standards

> **⚠️ READ THIS ENTIRE FILE BEFORE WRITING ANY CODE IN THIS PROJECT.**
> This document defines the architecture, conventions, optimization patterns, and best practices
> for the RepCoach React Native CLI application. Every contributor (human or AI) must follow these rules.

---

## Table of Contents

1. [Tech Stack Overview](#1-tech-stack-overview)
2. [Project Structure](#2-project-structure)
3. [Naming Conventions](#3-naming-conventions)
4. [Component Architecture](#4-component-architecture)
5. [Screen Development](#5-screen-development)
6. [Navigation](#6-navigation)
7. [State Management](#7-state-management)
8. [API & Networking](#8-api--networking)
9. [Theming & Styling](#9-theming--styling)
10. [Performance Optimization](#10-performance-optimization)
11. [TypeScript Standards](#11-typescript-standards)
12. [Imports & Module Resolution](#12-imports--module-resolution)
13. [Error Handling](#13-error-handling)
14. [Platform-Specific Code](#14-platform-specific-code)
15. [Assets Management](#15-assets-management)
16. [Forms & Validation](#16-forms--validation)
17. [Testing](#17-testing)
18. [Git & Version Control](#18-git--version-control)
19. [Common Anti-Patterns to Avoid](#19-common-anti-patterns-to-avoid)
20. [Checklist Before Every PR](#20-checklist-before-every-pr)
21. [Security & Sensitive Data](#21-security--sensitive-data)
22. [Accessibility (a11y)](#22-accessibility-a11y)
23. [Memory Leak Prevention](#23-memory-leak-prevention)
24. [Custom Hooks Architecture](#24-custom-hooks-architecture)
25. [Skeleton & Loading UX Patterns](#25-skeleton--loading-ux-patterns)
26. [Offline Support & Network Resilience](#26-offline-support--network-resilience)
27. [Deep Linking & Universal Links](#27-deep-linking--universal-links)
28. [Debugging & Profiling](#28-debugging--profiling)
29. [Bundle Size Optimization](#29-bundle-size-optimization)
30. [Redux Persist Migrations](#30-redux-persist-migrations)

---

## 1. Tech Stack Overview

| Layer             | Technology                                                    |
| ----------------- | ------------------------------------------------------------- |
| Framework         | React Native 0.79.x (CLI — NOT Expo)                         |
| Language          | TypeScript 5.x                                                |
| Navigation        | React Navigation 7.x (`native-stack`, `bottom-tabs`, `stack`) |
| State (Global)    | Redux Toolkit + Redux Persist (AsyncStorage)                  |
| State (Server)    | TanStack React Query 5.x                                     |
| Forms             | React Hook Form + Yup                                        |
| HTTP Client       | Axios (with interceptors & token refresh)                     |
| Auth Provider     | Firebase Auth (Email, Google, Apple)                          |
| Animations        | React Native Reanimated 3.x                                  |
| Gestures          | React Native Gesture Handler                                  |
| Styling Approach  | `StyleSheet.create()` — NO inline objects in render           |
| Icons             | react-native-vector-icons                                     |
| Images            | react-native-fast-image (cached), standard Image (local)      |

---

## 2. Project Structure

```
RepCoach/
├── App.tsx                          # Root component — providers & splash
├── index.js                         # App registration entry point
├── src/
│   ├── assets/                      # Static assets
│   │   ├── fonts/                   # Custom font files (.ttf, .otf)
│   │   ├── images/                  # PNG, JPG, SVG source images
│   │   └── index.js                 # Barrel export for all assets
│   │
│   ├── components/                  # Shared/reusable UI components
│   │   ├── BottomSheet.tsx
│   │   ├── CacheImage.tsx
│   │   ├── DividerLine.tsx
│   │   ├── Slider.tsx
│   │   └── StepIndicator.tsx
│   │
│   ├── constants/                   # App-wide constant data
│   │   └── onboardingData.ts
│   │
│   ├── context/                     # React Context providers
│   │   └── AuthContext.tsx
│   │
│   ├── navigation/                  # All navigation logic
│   │   ├── AuthNavigator.tsx        # Auth flow stack
│   │   ├── BottomTabNavigator.tsx   # Main tab navigator
│   │   ├── RootNavigator.tsx        # Top-level conditional navigator
│   │   └── types.ts                 # ParamList type definitions
│   │
│   ├── screens/                     # Feature screens (directory per screen)
│   │   ├── HomeScreen/
│   │   │   └── index.tsx
│   │   ├── ProfileScreen/
│   │   │   └── index.tsx
│   │   ├── assessment/              # Multi-step assessment flow
│   │   │   ├── InformationGatheringScreen.tsx
│   │   │   ├── GymTypeScreen.tsx
│   │   │   └── ...
│   │   ├── auth/                    # Auth screens
│   │   └── components/              # Screen-specific shared components
│   │
│   ├── services/                    # API layer
│   │   ├── api.ts                   # Axios instances, interceptors, API functions
│   │   └── endpoints.ts             # All endpoint URL constants
│   │
│   ├── store/                       # Redux store
│   │   ├── index.ts                 # Store config, persist setup, typed hooks
│   │   └── slices/                  # RTK slices (one file per domain)
│   │       ├── authSlice.ts
│   │       └── onboardingSlice.ts
│   │
│   ├── theme/                       # Design tokens
│   │   ├── index.ts                 # Barrel export
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── borderRadius.ts
│   │   ├── responsive.ts
│   │   └── shadows.ts
│   │
│   └── utils/                       # Utility/helper functions
│       ├── alert.ts
│       └── schema.ts                # Yup validation schemas
```

### Key Rules

- **Every screen gets its own directory** under `src/screens/` with an `index.tsx` entry file.
- **Shared components** go to `src/components/`. Screen-specific components stay inside the screen's directory.
- **Never put business logic in components** — extract it to hooks, slices, or service files.
- **Barrel exports** (`index.ts`) for theme, assets, and store. Import from the barrel, not individual files.

---

## 3. Naming Conventions

| Item                  | Convention               | Example                                |
| --------------------- | ------------------------ | -------------------------------------- |
| Screen directories    | PascalCase               | `HomeScreen/`, `ProfileScreen/`        |
| Screen files          | `index.tsx`              | `src/screens/HomeScreen/index.tsx`     |
| Components            | PascalCase `.tsx`        | `StepIndicator.tsx`                    |
| Hooks                 | `use` prefix, camelCase  | `useAuth.ts`, `useAppDispatch`         |
| Redux slices          | camelCase + `Slice`      | `authSlice.ts`, `onboardingSlice.ts`   |
| Types/Interfaces      | PascalCase, prefix `I`/`T` optional | `RootStackParamList`, `AuthContextType` |
| Constants             | UPPER_SNAKE_CASE         | `BASE_URL`, `Auth_ENDPOINT`            |
| Style objects         | `styles` (local const)   | `const styles = StyleSheet.create({})` |
| Theme tokens          | camelCase nested objects  | `colors.primary.main`, `spacing.md`   |
| Utility functions     | camelCase                | `showError()`, `formatDate()`          |
| Event handlers        | `handle` prefix          | `handleSubmit`, `handlePress`          |
| Boolean props/state   | `is`/`has`/`should` prefix | `isLoading`, `hasError`, `shouldRefresh` |

---

## 4. Component Architecture

### 4.1 — Component Template (Reusable / Shared)

```tsx
import React, { memo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Props {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

// ─── Component ──────────────────────────────────────────────────────────────
const CardHeader: React.FC<Props> = ({ title, subtitle, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.neutral.grey500,
    marginTop: 4,
  },
});

// ─── Export ──────────────────────────────────────────────────────────────────
export default memo(CardHeader);
```

### 4.2 — Rules

1. **Always wrap reusable components with `React.memo()`** to prevent unnecessary re-renders.
2. **Define types/interfaces above the component**, not inline.
3. **StyleSheet at the bottom**, never inline style objects in JSX (creates new objects every render).
4. **One component per file**. If a component grows beyond ~200 lines, split it.
5. **Use `useCallback` for every function passed as a prop** to child components.
6. **Use `useMemo` for expensive computations** or derived data.

---

## 5. Screen Development

### 5.1 — Screen Template

```tsx
import React, { useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography, spacing } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { useAppSelector, useAppDispatch } from '../../store';

// ─── Types ──────────────────────────────────────────────────────────────────
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// ─── Component ──────────────────────────────────────────────────────────────
const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  // ── Selectors (memoized via RTK) ──
  const user = useAppSelector(state => state.auth.user);

  // ── Derived data ──
  const greeting = useMemo(() => {
    return `Welcome back, ${user?.name ?? 'Athlete'}`;
  }, [user?.name]);

  // ── Handlers ──
  const handleNavigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  // ── Effects ──
  useEffect(() => {
    // Fetch data on mount
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>{greeting}</Text>
        {/* Screen content */}
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  greeting: {
    fontSize: typography.sizes?.xl ?? 24,
    fontFamily: typography.fontFamily?.WorkSansBold ?? 'System',
    color: colors.text,
  },
});

export default HomeScreen;
```

### 5.2 — Screen Rules

1. **Always use `SafeAreaView`** from `react-native-safe-area-context` as the outermost wrapper.
2. **Type the navigation prop** using the correct `ParamList` and screen name.
3. **Keep screens thin** — extract logic into custom hooks (`useHomeData.ts`) if the screen exceeds ~300 lines.
4. **Use `ScrollView` or `FlatList`** — never bare `View` for scrollable content.
5. **Show loading states** — always handle `isLoading`, `isError`, and empty states.

---

## 6. Navigation

### 6.1 — Architecture

```
NavigationContainer
└── RootNavigator (NativeStack)
    ├── [!isAuthenticated]  → AuthNavigator (Stack)
    │   ├── Login
    │   ├── Register
    │   └── ForgotPassword
    │
    ├── [!isAssessmentCompleted] → Assessment Group
    │   ├── InformationGathering
    │   ├── GymType
    │   ├── ... (multi-step flow)
    │   └── TailoredSolution
    │
    └── [authenticated + assessed] → Main App Group
        ├── MainApp → BottomTabNavigator
        │   ├── Home
        │   ├── Categories
        │   ├── Orders
        │   └── Settings
        ├── ProductDetail
        ├── NewArrival
        └── ...
```

### 6.2 — Rules

1. **Always define ParamList types** in `src/navigation/types.ts`.
2. **Use the global declaration** so `navigation.navigate()` is type-safe everywhere:
   ```ts
   declare global {
     namespace ReactNavigation {
       interface RootParamList extends RootStackParamList {}
     }
   }
   ```
3. **Prefer `NativeStackNavigator`** for most flows (better native performance).
4. **Use `Stack.Group`** to organize related screen groups with shared options.
5. **Never nest navigators unnecessarily** — keep hierarchy shallow.
6. **Passing params**: Use route params for IDs/flags only. Fetch data inside the destination screen.

### 6.3 — Navigation Pattern

```tsx
// ✅ CORRECT — type-safe navigation
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
navigation.navigate('ProductDetail', { productId: '123' });

// ❌ WRONG — untyped, error-prone
navigation.navigate('ProductDetail' as any, { id: 123 });
```

---

## 7. State Management

### 7.1 — When to Use What

| Need                          | Solution                                    |
| ----------------------------- | ------------------------------------------- |
| Server data (API responses)   | **TanStack React Query** (`useQuery`, `useMutation`) |
| Auth tokens, user session     | **Redux Toolkit + Redux Persist**           |
| Onboarding/assessment progress | **Redux Toolkit + Redux Persist**           |
| Form state                    | **React Hook Form** (local)                 |
| UI toggles (modal open, etc.) | **React `useState`** (local)                |
| Cross-screen shared state     | **Redux Toolkit**                           |
| Theme / Auth flags             | **React Context** (when simple)             |

### 7.2 — Redux Slice Template

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ─── Types ──────────────────────────────────────────────────────────────────
interface AuthState {
  access_token: string | null;
  firebase_token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
}

// ─── Initial State ──────────────────────────────────────────────────────────
const initialState: AuthState = {
  access_token: null,
  firebase_token: null,
  user: null,
  isLoading: false,
};

// ─── Slice ──────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.access_token = action.payload;
    },
    setUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
    },
    logout(state) {
      return initialState; // Reset to initial
    },
  },
});

export const { setAccessToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
```

### 7.3 — Rules

1. **Always use typed hooks**: `useAppDispatch()` and `useAppSelector()` from `src/store/index.ts`.
2. **Never access `store.getState()` in components** — only in service files or thunks.
3. **Add new slices to the `rootReducer` combiner** AND to the `whitelist` in `persistConfig` if they need persistence.
4. **Keep slices focused** — one per domain (auth, onboarding, interview, etc.).
5. **Use React Query for server state** — don't duplicate API data in Redux.

### 7.4 — React Query Pattern

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch
const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['homeScreen'],
  queryFn: getHomeScreenData,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutate
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: saveUserProfile,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['userProfile'] });
  },
});
```

---

## 8. API & Networking

### 8.1 — Axios Instance Architecture

The project uses **three** Axios instances in `src/services/api.ts`:

| Instance    | Purpose                                      |
| ----------- | -------------------------------------------- |
| `api`       | Authenticated requests (auto-attaches token) |
| `apiNoAuth` | Public endpoints (no auth header)            |
| `rawAxios`  | Raw Axios, no base URL, no interceptors      |

### 8.2 — Adding a New API Function

```ts
// 1. Add the endpoint constant in endpoints.ts
export const NewFeature_ENDPOINT = `${BASE_URL}/user/new-feature`;

// 2. Add the function in api.ts
export const getNewFeatureData = async (): Promise<NewFeatureResponse> => {
  try {
    const res = await api.get(NewFeature_ENDPOINT);
    return res.data;
  } catch (error) {
    console.error('getNewFeatureData error:', error);
    throw error; // Let React Query handle the error
  }
};
```

### 8.3 — Rules

1. **All endpoint URLs live in `endpoints.ts`** — never hardcode URLs in components or api.ts functions.
2. **Token refresh is handled by interceptors** — never manually refresh tokens in components.
3. **Use `try/catch` and re-throw** in API functions — let React Query / callers handle errors.
4. **For file uploads**, use `FormData` with `'Content-Type': 'multipart/form-data'`.
5. **Set reasonable timeouts** for long operations (e.g., video upload: `timeout: 600000`).
6. **Never log sensitive data** (tokens, passwords) in production. Use `__DEV__` guards:
   ```ts
   if (__DEV__) console.log('Token:', token);
   ```

---

## 9. Theming & Styling

### 9.1 — Design Token Usage

```tsx
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,       // Use token, not magic number
    padding: spacing.md,                 // Use token, not 16
    ...shadows.card,                     // Spread shadow preset
  },
  title: {
    fontFamily: typography.fontFamily.WorkSansBold,
    fontSize: typography.sizes.lg,
    color: colors.text,
  },
});
```

### 9.2 — Responsive Design

```tsx
import { hp, wp } from '../theme/responsive';
import { scale } from '../theme/typography';

const styles = StyleSheet.create({
  header: {
    height: hp('13'),           // 13% of screen height
    paddingHorizontal: wp('4'), // 4% of screen width
  },
  title: {
    fontSize: scale(25),        // Scaled font size
  },
});
```

### 9.3 — Rules

1. **NEVER use inline style objects in JSX** — always use `StyleSheet.create()`:
   ```tsx
   // ❌ BAD — creates new object every render
   <View style={{ padding: 16, backgroundColor: 'white' }}>

   // ✅ GOOD — static reference
   <View style={styles.container}>

   // ✅ OK — merging static styles with dynamic
   <View style={[styles.container, { opacity: isVisible ? 1 : 0 }]}>
   ```
2. **Use theme tokens** — never hardcode colors, font sizes, spacing, or border radius.
3. **Use `hp()` / `wp()` / `scale()`** for dimensions that must adapt across screen sizes.
4. **Platform-specific styles** via `Platform.select()` or `Platform.OS` checks.
5. **Group styles logically** — container → content elements → text → modifiers.

---

## 10. Performance Optimization

### 10.1 — Component Memoization

```tsx
// Wrap all reusable components
export default React.memo(MyComponent);

// For components with complex props, provide a custom comparator
export default React.memo(MyComponent, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id && prevProps.title === nextProps.title;
});
```

### 10.2 — Stable References

```tsx
// ✅ useCallback for handlers passed to children
const handlePress = useCallback(() => {
  navigation.navigate('Detail', { id: item.id });
}, [navigation, item.id]);

// ✅ useMemo for expensive computations
const filteredData = useMemo(() => {
  return data.filter(item => item.score > threshold);
}, [data, threshold]);

// ✅ useMemo for static arrays/objects passed as props
const listHeaderStyle = useMemo(() => [styles.header, { marginTop: insets.top }], [insets.top]);
```

### 10.3 — FlatList Optimization

```tsx
<FlatList
  data={items}
  renderItem={renderItem}                    // Must be useCallback-wrapped
  keyExtractor={keyExtractor}                // Must be useCallback-wrapped
  getItemLayout={getItemLayout}              // If items have fixed height
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}               // Android performance
  initialNumToRender={10}
  updateCellsBatchingPeriod={50}
/>

// Key extractor — always stable
const keyExtractor = useCallback((item: Item) => item.id.toString(), []);

// Render item — always stable
const renderItem = useCallback(({ item }: { item: Item }) => (
  <ListItem item={item} onPress={handleItemPress} />
), [handleItemPress]);
```

### 10.4 — Image Optimization

```tsx
// ✅ Use FastImage for network images (cached)
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl, priority: FastImage.priority.normal }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.cover}
/>

// ✅ Use require() for local images (bundled at compile time)
<Image source={require('../assets/images/logo.png')} />

// ✅ Use the asset barrel export
import { logo } from '../assets';
<Image source={logo} />
```

### 10.5 — Animation Performance

```tsx
// ✅ Use Reanimated for animations — runs on UI thread
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const opacity = useSharedValue(0);
const animatedStyle = useAnimatedStyle(() => ({
  opacity: withTiming(opacity.value, { duration: 300 }),
}));

// ❌ NEVER use Animated from 'react-native' for complex animations
// It runs on the JS thread and causes frame drops
```

### 10.6 — General Performance Rules

| Rule | Why |
|------|-----|
| Never use anonymous functions in JSX for child components | Creates new reference every render → child re-renders |
| Avoid `setTimeout` in render body (like in current `App.tsx` splash) | Causes re-renders on every timer tick |
| Use `InteractionManager.runAfterInteractions()` for post-navigation work | Prevents janky transitions |
| Lazy-load heavy screens with `React.lazy()` + `Suspense` | Reduces initial bundle parse time |
| Avoid spreading `{...props}` blindly | Passes unwanted data, bypasses type checking |
| Use `removeClippedSubviews` on Android `FlatList` | Frees memory for off-screen items |
| Keep Redux selectors granular | `useAppSelector(s => s.auth.user)` not `useAppSelector(s => s.auth)` |

---

## 11. TypeScript Standards

### 11.1 — Strict Rules

1. **No `any` type** — use `unknown` and narrow, or define proper types.
   ```ts
   // ❌ BAD
   const data: any = response.data;

   // ✅ GOOD
   interface ApiResponse { user: UserProfile; token: string }
   const data = response.data as ApiResponse;
   ```

2. **Define return types for exported functions**:
   ```ts
   export const getUser = async (): Promise<UserProfile | null> => { ... };
   ```

3. **Use interfaces for object shapes, types for unions/primitives**:
   ```ts
   interface UserProfile { name: string; email: string }
   type AuthProvider = 'google' | 'apple' | 'email';
   ```

4. **Avoid type assertions (`as`)** unless absolutely necessary — prefer type guards.

### 11.2 — Navigation Types

Always define route params in `src/navigation/types.ts`:

```ts
export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };  // Required param
  Profile: { userId?: string };          // Optional param
};
```

---

## 12. Imports & Module Resolution

### 12.1 — Import Order

Follow this strict order (separated by blank lines):

```tsx
// 1. React & React Native
import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// 2. Third-party libraries
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';

// 3. Internal — navigation, store, services
import { RootStackParamList } from '../../navigation/types';
import { useAppSelector, useAppDispatch } from '../../store';
import { getHomeScreenData } from '../../services/api';

// 4. Internal — theme, utils, constants
import { colors, typography, spacing } from '../../theme';
import { showError } from '../../utils/alert';

// 5. Internal — components
import CardHeader from '../../components/CardHeader';

// 6. Internal — assets
import { headerBg, logo } from '../../assets';

// 7. Types (type-only imports)
import type { UserProfile } from '../../types';
```

### 12.2 — Rules

1. **Use barrel exports** — import from `../theme` not `../theme/colors`.
2. **Use relative paths** consistently (no path aliases configured currently).
3. **Avoid circular imports** — services should not import from screens, screens should not import from other screens.
4. **Use `import type`** for type-only imports to ensure they're removed at compile time.

---

## 13. Error Handling

### 13.1 — API Error Handling Pattern

```tsx
// In service layer — throw errors for callers to handle
export const fetchData = async (): Promise<Data> => {
  try {
    const response = await api.get('/endpoint');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Interceptor handles 401 globally — just re-throw
        throw error;
      }
      throw new Error(error.response?.data?.message ?? 'Request failed');
    }
    throw error;
  }
};

// In screen — React Query handles errors
const { data, isError, error } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
});

if (isError) {
  return <ErrorView message={error.message} onRetry={refetch} />;
}
```

### 13.2 — User-Facing Errors

```tsx
import { showError } from '../utils/alert';

// For user-facing errors, use the alert utility
showError('Unable to save profile. Please try again.');
```

### 13.3 — Rules

1. **Never swallow errors silently** — always log or show feedback.
2. **Use `axios.isAxiosError()`** to distinguish network vs app errors.
3. **Firebase errors have `.code`** — always switch on `error.code` for user-friendly messages.
4. **Global 401 handling** happens in Axios interceptors — don't duplicate it in individual endpoints.

---

## 14. Platform-Specific Code

```tsx
import { Platform } from 'react-native';

// ✅ Simple checks
const headerHeight = Platform.OS === 'ios' ? hp('13') : hp('9');

// ✅ Platform.select for style objects
const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }) as ViewStyle,
});

// ✅ Platform-specific files (when logic differs significantly)
// MyComponent.ios.tsx
// MyComponent.android.tsx
// React Native auto-resolves the correct file
```

---

## 15. Assets Management

### 15.1 — How to Add New Assets

1. **Images**: Place in `src/assets/images/`, then export from `src/assets/index.js`:
   ```js
   export const newIcon = require('./images/new_icon.png');
   ```
2. **Fonts**: Place in `src/assets/fonts/`, run `npx react-native-asset` to link.
3. **SVGs**: Use `react-native-svg` for inline SVGs or convert to components.

### 15.2 — Rules

1. **Always import images via the barrel export** — never use `require()` inline in JSX.
2. **Optimize image sizes** before adding — use WebP where supported.
3. **Use `@2x` and `@3x` suffixes** for resolution-aware images.

---

## 16. Forms & Validation

### 16.1 — Pattern

```tsx
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Schema
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

// In component
const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
  resolver: yupResolver(schema),
  defaultValues: { email: '', password: '' },
});

const onSubmit = useCallback(async (data: FormData) => {
  // Handle submission
}, []);
```

### 16.2 — Rules

1. **Schemas live in `src/utils/schema.ts`** or co-located with the screen if single-use.
2. **Use `yup.InferType`** to derive form types from the schema — single source of truth.
3. **Wrap submit handlers with `useCallback`**.
4. **Show validation errors inline** near the input field.

---

## 17. Testing

```tsx
// File naming: ComponentName.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardHeader from '../CardHeader';

describe('CardHeader', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<CardHeader title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(
      <CardHeader title="Title" subtitle="Subtitle" />
    );
    expect(getByText('Subtitle')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = render(<CardHeader title="Title" />);
    expect(queryByText('Subtitle')).toBeNull();
  });
});
```

### Rules

1. Run tests with `yarn test`.
2. Test **behavior**, not implementation details.
3. Mock navigation, Redux store, and API calls in tests.

---

## 18. Git & Version Control

### 18.1 — Commit Message Format

```
<type>(<scope>): <short description>

[optional body]
```

**Types**: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `perf`

**Examples**:
```
feat(assessment): add heart rate assessment screen
fix(auth): resolve token refresh race condition
perf(home): memoize product list rendering
refactor(api): extract endpoint constants to separate file
```

### 18.2 — Branch Naming

```
feature/<short-description>
bugfix/<issue-or-description>
refactor/<scope>
```

---

## 19. Common Anti-Patterns to Avoid

### ❌ Inline functions in JSX (for child components)
```tsx
// BAD — new function reference every render
<Button onPress={() => navigation.navigate('Home')} />

// GOOD
const handleGoHome = useCallback(() => navigation.navigate('Home'), [navigation]);
<Button onPress={handleGoHome} />
```

### ❌ Not cleaning up effects
```tsx
// BAD — potential memory leak
useEffect(() => {
  const interval = setInterval(fetchData, 5000);
  // Missing cleanup!
}, []);

// GOOD
useEffect(() => {
  const interval = setInterval(fetchData, 5000);
  return () => clearInterval(interval);
}, []);
```

### ❌ Using setTimeout in component body
```tsx
// BAD (see current App.tsx splash) — runs on every render, not cleaned up
setTimeout(() => setSplashVisible(false), 2000);

// GOOD — inside useEffect with cleanup
useEffect(() => {
  const timer = setTimeout(() => setSplashVisible(false), 2000);
  return () => clearTimeout(timer);
}, []);
```

### ❌ Deriving state from props without useMemo
```tsx
// BAD — recalculates on every render
const fullName = `${user.firstName} ${user.lastName}`;

// GOOD
const fullName = useMemo(
  () => `${user.firstName} ${user.lastName}`,
  [user.firstName, user.lastName]
);
```

### ❌ Over-fetching from Redux
```tsx
// BAD — re-renders whenever ANY auth field changes
const auth = useAppSelector(state => state.auth);

// GOOD — only re-renders when user specifically changes
const userName = useAppSelector(state => state.auth.user?.name);
```

### ❌ Importing entire libraries
```tsx
// BAD — imports everything
import * as Icons from 'react-native-vector-icons/Ionicons';

// GOOD — tree-shakeable import
import Icon from 'react-native-vector-icons/Ionicons';
```

### ❌ Console.log in production
```tsx
// BAD
console.log('user data:', userData);

// GOOD — dev-only logging
if (__DEV__) console.log('user data:', userData);
```

---

## 20. Checklist Before Every PR

### Code Quality
- [ ] **No `any` types** — all types are defined or narrowed.
- [ ] **No inline styles** — all styles use `StyleSheet.create()`.
- [ ] **No hardcoded colors/spacing** — all use theme tokens.
- [ ] **No `console.log`** — or guarded with `__DEV__`.
- [ ] **Endpoints in `endpoints.ts`** — no hardcoded URLs.
- [ ] **Assets use barrel import** — from `../assets`, not direct `require()`.
- [ ] **Import order followed** — React → third-party → internal → types.

### Performance
- [ ] **Memoized components** — shared components wrapped with `React.memo()`.
- [ ] **Stable handlers** — all callbacks passed to children use `useCallback`.
- [ ] **Expensive computations memoized** — use `useMemo` for derived data.
- [ ] **Redux selectors are granular** — select only the needed field.
- [ ] **FlatList optimized** — `keyExtractor`, `renderItem` are `useCallback`, `getItemLayout` if possible.
- [ ] **No unnecessary re-renders** — verified with React DevTools Profiler.

### Reliability
- [ ] **Effects have cleanup** — timers, subscriptions, and listeners are cleaned up.
- [ ] **Async operations are abort-safe** — `AbortController` used or `isMounted` guard present.
- [ ] **Errors are handled** — loading, error, and empty states are implemented.
- [ ] **Navigation is typed** — using correct `ParamList` type.

### Security
- [ ] **No sensitive data in logs** — tokens, passwords, PII never logged.
- [ ] **Tokens stored securely** — using AsyncStorage with persist encrypt if needed.
- [ ] **No sensitive data in route params** — passwords, tokens never in navigation params.

### Accessibility
- [ ] **Touchable areas ≥ 44pt** — all interactive elements meet minimum hit target.
- [ ] **`accessibilityLabel` on icons/images** — screen readers can describe them.
- [ ] **Form errors announced** — via `accessibilityLiveRegion` or `accessibilityRole`.

### Platform & UX
- [ ] **Platform checks present** — if UI or behavior differs between iOS/Android.
- [ ] **Tested on both platforms** — or at minimum the primary target.
- [ ] **Loading skeletons present** — not just spinners for content-heavy screens.
- [ ] **Keyboard dismisses properly** — forms wrapped with `KeyboardAvoidingView`.
- [ ] **Back navigation works** — hardware back button on Android handled correctly.

---

## 21. Security & Sensitive Data

### 21.1 — Token Storage

```tsx
// ✅ CURRENT APPROACH — AsyncStorage via Redux Persist
// Tokens are stored in the persisted auth slice.
// For higher security apps, consider react-native-keychain:

// import * as Keychain from 'react-native-keychain';
// await Keychain.setGenericPassword('accessToken', token);
// const credentials = await Keychain.getGenericPassword();
```

### 21.2 — Rules

1. **Never log tokens, passwords, or PII**:
   ```ts
   // ❌ BAD
   console.log('Token:', accessToken);
   console.log('User:', JSON.stringify(user));

   // ✅ GOOD
   if (__DEV__) console.log('Token received, length:', accessToken?.length);
   ```

2. **Never pass sensitive data via navigation params**:
   ```tsx
   // ❌ BAD — params are serialized and may be logged
   navigation.navigate('Profile', { token: userToken, password: pwd });

   // ✅ GOOD — pass only IDs, read data from store
   navigation.navigate('Profile', { userId: user.id });
   ```

3. **Sanitize error messages before showing to users**:
   ```ts
   // ❌ BAD — may leak internal server info
   showError(error.response?.data?.debug_message);

   // ✅ GOOD — user-friendly message
   showError('Something went wrong. Please try again.');
   ```

4. **Use HTTPS exclusively** — never allow HTTP endpoints in production.

5. **Clear sensitive data on logout** — tokens, cached user data, React Query cache:
   ```ts
   const handleLogout = async () => {
     store.dispatch(logout());           // Clear Redux
     queryClient.clear();                // Clear React Query cache
     await AsyncStorage.removeItem('fcm_token');
     await firebaseAuth.signOut();
   };
   ```

6. **Validate all external data** — never trust API responses blindly:
   ```ts
   // ✅ GOOD — validate before using
   const user = response.data?.user;
   if (!user?.id || !user?.email) {
     throw new Error('Invalid user data received');
   }
   ```

### 21.3 — API Security Checklist

- [ ] SSL pinning considered for sensitive endpoints
- [ ] Refresh tokens have proper expiry handling
- [ ] Failed auth redirects to login (via interceptors)
- [ ] No secrets in source code (use environment variables)
- [ ] API keys are not committed to git (use `.env` files with `react-native-config`)

---

## 22. Accessibility (a11y)

### 22.1 — Minimum Requirements

Every screen must be usable by VoiceOver (iOS) and TalkBack (Android).

```tsx
// ✅ Buttons — always have accessible labels
<TouchableOpacity
  onPress={handlePress}
  accessibilityRole="button"
  accessibilityLabel="Go to profile settings"
  accessibilityHint="Opens your profile editing screen"
  style={styles.button}
>
  <Icon name="settings" size={24} />
</TouchableOpacity>

// ✅ Images — describe content for screen readers
<Image
  source={avatar}
  accessibilityRole="image"
  accessibilityLabel={`Profile photo of ${user.name}`}
/>

// ✅ Text Inputs — proper labels
<TextInput
  placeholder="Enter your email"
  accessibilityLabel="Email address input"
  accessibilityRole="text"
  keyboardType="email-address"
  autoComplete="email"
  textContentType="emailAddress"
/>

// ✅ Dynamic content — announce changes
<View accessibilityLiveRegion="polite">
  <Text>{errorMessage}</Text>
</View>
```

### 22.2 — Touch Target Sizes

```tsx
// ❌ BAD — too small for fingers
<TouchableOpacity style={{ width: 20, height: 20 }} />

// ✅ GOOD — minimum 44x44 points (Apple HIG) / 48x48 dp (Material)
<TouchableOpacity
  style={{ minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' }}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}  // Extend touch area
/>
```

### 22.3 — Rules

1. **Every `TouchableOpacity` with only an icon** must have `accessibilityLabel`.
2. **Use `accessibilityRole`** — `button`, `header`, `link`, `image`, `text`, `search`, `tab`.
3. **Use `accessibilityState`** for toggles — `{ selected: true }`, `{ disabled: true }`.
4. **Group related content** with `accessible={true}` to read as one item.
5. **Test with a real screen reader** — at least once before shipping.
6. **Support Dynamic Type** — use `allowFontScaling` prop (enabled by default).
7. **Color contrast** — maintain 4.5:1 ratio for text, 3:1 for large text.

---

## 23. Memory Leak Prevention

### 23.1 — Async Operations in Components

```tsx
// ❌ BAD — setting state after unmount causes memory leak + warning
useEffect(() => {
  fetchData().then(data => setData(data)); // Component may unmount before this resolves
}, []);

// ✅ GOOD (Option A) — AbortController for fetch/axios
useEffect(() => {
  const controller = new AbortController();

  const loadData = async () => {
    try {
      const response = await api.get('/endpoint', { signal: controller.signal });
      setData(response.data);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Fetch failed:', error);
      }
    }
  };

  loadData();
  return () => controller.abort();
}, []);

// ✅ GOOD (Option B) — isMounted ref guard (simpler for non-cancellable operations)
useEffect(() => {
  let isMounted = true;

  fetchData().then(data => {
    if (isMounted) setData(data);
  });

  return () => { isMounted = false; };
}, []);
```

### 23.2 — Event Listeners

```tsx
// ✅ Always remove listeners
useEffect(() => {
  const subscription = AppState.addEventListener('change', handleAppStateChange);
  return () => subscription.remove();
}, [handleAppStateChange]);

// ✅ Keyboard listeners
useEffect(() => {
  const showSub = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
  const hideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
  return () => {
    showSub.remove();
    hideSub.remove();
  };
}, [handleKeyboardShow, handleKeyboardHide]);

// ✅ Firebase/Firestore listeners
useEffect(() => {
  const unsubscribe = firestore()
    .collection('tasks')
    .onSnapshot(snapshot => {
      // Handle updates
    });
  return () => unsubscribe();
}, []);
```

### 23.3 — Timers

```tsx
// ✅ Always clean up timers
useEffect(() => {
  const timer = setTimeout(() => setVisible(false), 3000);
  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  const interval = setInterval(pollStatus, 5000);
  return () => clearInterval(interval);
}, [pollStatus]);
```

### 23.4 — Navigation Listeners

```tsx
// ✅ React Navigation listeners auto-cleanup when using hooks
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    refetch(); // Refresh data when screen comes back into focus
  });
  return unsubscribe;
}, [navigation, refetch]);

// ✅ Or use the useFocusEffect hook (preferred)
import { useFocusEffect } from '@react-navigation/native';

useFocusEffect(
  useCallback(() => {
    loadData();
    return () => cancelRequest(); // Cleanup when losing focus
  }, [loadData])
);
```

### 23.5 — Rules Summary

| Source | Cleanup Method |
|--------|----------------|
| `setTimeout` | `clearTimeout()` in effect cleanup |
| `setInterval` | `clearInterval()` in effect cleanup |
| `addEventListener` | `.remove()` in effect cleanup |
| Firestore `onSnapshot` | Call returned `unsubscribe()` function |
| Axios requests | `AbortController.abort()` |
| Navigation listeners | Call returned `unsubscribe()` or use hook |
| Animated values | `.stopAnimation()` or `.cancelAnimation()` |

---

## 24. Custom Hooks Architecture

### 24.1 — When to Extract a Custom Hook

Extract a custom hook when:
- A screen exceeds **~250 lines** and has mixed UI + logic
- The **same logic repeats** across 2+ screens
- You need to **encapsulate** a complex side effect (timers, listeners, API polling)
- You want to make logic **testable** independently from the UI

### 24.2 — File Placement

```
src/
├── hooks/                          # ← NEW: shared hooks directory
│   ├── useDebounce.ts              # Generic utility hooks
│   ├── useNetworkStatus.ts
│   └── useKeyboardHeight.ts
│
├── screens/
│   └── HomeScreen/
│       ├── index.tsx               # UI component
│       └── useHomeData.ts          # Screen-specific hook
```

- **Shared hooks** → `src/hooks/`
- **Screen-specific hooks** → inside the screen's directory

### 24.3 — Hook Template

```tsx
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomeScreenData } from '../../services/api';
import { useAppSelector } from '../../store';

// ─── Types ──────────────────────────────────────────────────────────────────
interface UseHomeDataReturn {
  data: HomeScreenData | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  greeting: string;
}

// ─── Hook ───────────────────────────────────────────────────────────────────
export const useHomeData = (): UseHomeDataReturn => {
  const user = useAppSelector(state => state.auth.user);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['homeScreen'],
    queryFn: getHomeScreenData,
    staleTime: 5 * 60 * 1000,
  });

  const greeting = useMemo(
    () => `Welcome back, ${user?.name ?? 'Athlete'}`,
    [user?.name]
  );

  return { data, isLoading, isError, refetch, greeting };
};
```

### 24.4 — Common Utility Hooks

```tsx
// ─── useDebounce ────────────────────────────────────────────────────────────
export const useDebounce = <T>(value: T, delayMs: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
};

// ─── useKeyboardVisible ─────────────────────────────────────────────────────
export const useKeyboardVisible = (): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setIsVisible(true)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setIsVisible(false)
    );
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  return isVisible;
};

// ─── usePrevious ────────────────────────────────────────────────────────────
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => { ref.current = value; });
  return ref.current;
};

// ─── useCountdown ───────────────────────────────────────────────────────────
export const useCountdown = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || seconds <= 0) return;
    const interval = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const start = useCallback(() => setIsActive(true), []);
  const reset = useCallback(() => {
    setIsActive(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return { seconds, isActive, start, reset };
};
```

### 24.5 — Rules

1. **Hooks must start with `use`** — enforces the rules of hooks via linter.
2. **Return an object, not an array** — for hooks with more than 2 return values (better readability).
3. **Always define a return type interface** — makes the hook self-documenting.
4. **Keep hooks pure** — no side effects outside of `useEffect`.
5. **One concern per hook** — don't mix unrelated logic.

---

## 25. Skeleton & Loading UX Patterns

### 25.1 — Loading State Hierarchy

Use the appropriate loading pattern based on context:

| Context | Pattern | Example |
|---------|---------|---------|
| First-time data load | **Skeleton screen** | Home feed, profile page |
| Refreshing existing data | **Pull-to-refresh spinner** | Swipe down on list |
| Button action | **Inline button spinner** | "Save" → shows spinner inside button |
| Navigation transition | **Activity indicator** | Brief full-screen spinner |
| Background operation | **No visible indicator** | Silent cache refresh |

### 25.2 — Skeleton Component Pattern

```tsx
import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, borderRadius, spacing } from '../theme';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius: br = 8 }) => {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1, // Infinite
      true // Reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: br, backgroundColor: colors.neutral.grey200 },
        animatedStyle,
      ]}
    />
  );
};

export default memo(Skeleton);

// ─── Usage in a Screen ─────────────────────────────────────────────────────
const HomeScreenSkeleton = () => (
  <View style={styles.container}>
    <Skeleton width="60%" height={24} />                    {/* Title */}
    <Skeleton width="100%" height={180} borderRadius={12} /> {/* Card */}
    <Skeleton width="40%" height={16} />                    {/* Subtitle */}
    <Skeleton width="100%" height={60} />                    {/* List item */}
    <Skeleton width="100%" height={60} />                    {/* List item */}
  </View>
);
```

### 25.3 — Screen Loading Pattern

```tsx
const HomeScreen: React.FC = () => {
  const { data, isLoading, isError, refetch } = useHomeData();

  // ── Loading state ──
  if (isLoading) {
    return <HomeScreenSkeleton />;
  }

  // ── Error state ──
  if (isError) {
    return (
      <ErrorView
        message="Unable to load your dashboard"
        onRetry={refetch}
      />
    );
  }

  // ── Empty state ──
  if (!data || data.items.length === 0) {
    return (
      <EmptyView
        icon="fitness-outline"
        title="No workouts yet"
        subtitle="Start your first workout to see stats here"
      />
    );
  }

  // ── Success state ──
  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
    }>
      {/* Content */}
    </ScrollView>
  );
};
```

### 25.4 — Rules

1. **Never show a blank white screen** — always show a skeleton, spinner, or placeholder.
2. **Match skeleton shapes to actual content** — users should recognize the layout.
3. **Use Reanimated for skeleton pulse** — smoother than RN Animated.
4. **Support pull-to-refresh** on every list/scrollable screen.
5. **Show inline spinners for button actions** — disable the button while loading.

---

## 26. Offline Support & Network Resilience

### 26.1 — Network Status Detection

```tsx
// src/hooks/useNetworkStatus.ts
import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return isConnected;
};
```

### 26.2 — Offline-Aware API Calls

```tsx
// React Query handles offline gracefully with proper config
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      networkMode: 'offlineFirst', // Return cached data when offline
    },
    mutations: {
      retry: 1,
      networkMode: 'offlineFirst',
    },
  },
});
```

### 26.3 — Offline Banner Pattern

```tsx
const OfflineBanner: React.FC = () => {
  const isConnected = useNetworkStatus();

  if (isConnected !== false) return null;

  return (
    <Animated.View
      entering={SlideInUp}
      exiting={SlideOutUp}
      style={styles.banner}
    >
      <Icon name="cloud-offline" size={16} color={colors.neutral.white} />
      <Text style={styles.bannerText}>No internet connection</Text>
    </Animated.View>
  );
};
```

### 26.4 — Rules

1. **Always handle network errors gracefully** — show retry buttons, not crashes.
2. **Use exponential backoff** for retries — don't hammer a failing server.
3. **Cache critical data** — user profile, auth tokens should work offline via Redux Persist.
4. **Queue mutations when offline** — retry when connectivity returns (React Query supports this).
5. **Show clear offline indicators** — users should know when they're offline.

---

## 27. Deep Linking & Universal Links

### 27.1 — Configuration

```tsx
// In NavigationContainer (App.tsx)
const linking = {
  prefixes: ['repcoach://', 'https://repcoach.com'],
  config: {
    screens: {
      MainApp: {
        screens: {
          Home: 'home',
          Profile: 'profile',
        },
      },
      ProductDetail: 'product/:productId',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* ... */}
</NavigationContainer>
```

### 27.2 — Rules

1. **Define linking config alongside navigation types** — they must stay in sync.
2. **Test deep links** with `npx uri-scheme open repcoach://product/123 --android`.
3. **Handle auth-gated deep links** — redirect to login if user is not authenticated, then redirect back after auth.

---

## 28. Debugging & Profiling

### 28.1 — Tools

| Tool | Purpose |
|------|---------|
| **Flipper** | Network inspector, Redux viewer, layout inspector |
| **React DevTools** | Component tree, prop inspection |
| **React Native Profiler** | Identify re-renders and slow components |
| **Xcode Instruments** | iOS memory leaks, CPU profiling |
| **Android Studio Profiler** | Android memory, CPU, network |
| **Reactotron** | Alternative to Flipper — Redux, API monitoring |

### 28.2 — Performance Profiling

```tsx
// Wrap suspicious components to detect re-renders
import { Profiler } from 'react';

const onRenderCallback = (
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
) => {
  if (__DEV__ && actualDuration > 16) { // Longer than one frame (60fps)
    console.warn(`[PERF] ${id} ${phase} took ${actualDuration.toFixed(1)}ms`);
  }
};

<Profiler id="HomeScreen" onRender={onRenderCallback}>
  <HomeScreen />
</Profiler>
```

### 28.3 — Why-Did-You-Render (Development Only)

```ts
// Add to index.js (development only)
if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
```

### 28.4 — Debugging Tips

1. **Use `console.time()` for measuring operations**:
   ```ts
   if (__DEV__) {
     console.time('DataTransform');
     const result = transformData(rawData);
     console.timeEnd('DataTransform'); // prints: DataTransform: 12.5ms
   }
   ```

2. **Network debugging**: Use Flipper's Network plugin or React Query DevTools.

3. **Redux debugging**: Use `redux-logger` middleware in dev:
   ```ts
   import logger from 'redux-logger';
   middleware: getDefaultMiddleware =>
     __DEV__
       ? getDefaultMiddleware({ ... }).concat(logger)
       : getDefaultMiddleware({ ... }),
   ```

4. **Memory leak detection**: Enable Hermes sampling profiler for long-running sessions.

---

## 29. Bundle Size Optimization

### 29.1 — Analysis

```bash
# Generate bundle stats
npx react-native-bundle-visualizer

# Or generate source map and analyze
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output bundle.js --sourcemap-output bundle.js.map
npx source-map-explorer bundle.js bundle.js.map
```

### 29.2 — Optimization Strategies

| Strategy | Impact | How |
|----------|--------|-----|
| Use Hermes engine | **High** | Enabled by default in RN 0.79 |
| Tree-shake unused imports | **High** | Avoid `import *` — use named imports |
| Lazy-load heavy screens | **Medium** | `React.lazy()` + `Suspense` |
| Optimize images | **High** | Use WebP, compress PNG/JPG, use `@2x`/`@3x` |
| Avoid large utility libraries | **Medium** | Use `lodash/get` not `lodash` |
| Remove unused dependencies | **Medium** | `npx depcheck` to find unused packages |
| Enable ProGuard (Android) | **Medium** | Reduces release APK size |
| Enable Bitcode (iOS) | **Low** | Apple re-optimizes for each device |

### 29.3 — Import Best Practices for Bundle Size

```tsx
// ❌ BAD — imports entire library (~70kb)
import _ from 'lodash';
_.get(obj, 'path');

// ✅ GOOD — imports only needed function (~2kb)
import get from 'lodash/get';
get(obj, 'path');

// ❌ BAD — imports all icons (~2MB)
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// ✅ GOOD — use only ONE icon family, or use custom icon font
import Icon from 'react-native-vector-icons/Ionicons';

// ❌ BAD — moment.js is 300kb+
import moment from 'moment';

// ✅ GOOD — date-fns is tree-shakeable, or use Intl API
import { format } from 'date-fns';
```

### 29.4 — Lazy Loading Screens

```tsx
import React, { Suspense, lazy } from 'react';
import { ActivityIndicator } from 'react-native';

// Lazy load heavy screens that aren't on the initial path
const ProductDetail = lazy(() => import('../screens/ProductDetail'));

// In navigator
<Stack.Screen name="ProductDetail">
  {(props) => (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <ProductDetail {...props} />
    </Suspense>
  )}
</Stack.Screen>
```

---

## 30. Redux Persist Migrations

### 30.1 — Why Migrations Matter

When you change the shape of a persisted Redux slice (add/remove/rename fields), existing users
will have **stale data** in AsyncStorage. Without migrations, this causes crashes or data loss.

### 30.2 — Migration Pattern

```ts
import { createMigrate, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define migrations keyed by version number
const migrations = {
  // Version 0 → 1: Added `isAssessmentCompleted` field to auth
  1: (state: any) => ({
    ...state,
    auth: {
      ...state.auth,
      isAssessmentCompleted: false, // Default for existing users
    },
  }),

  // Version 1 → 2: Renamed `firebase_token` to `firebaseToken`
  2: (state: any) => {
    const { firebase_token, ...authRest } = state.auth;
    return {
      ...state,
      auth: {
        ...authRest,
        firebaseToken: firebase_token ?? null,
      },
    };
  },

  // Version 2 → 3: Added new `preferences` slice
  3: (state: any) => ({
    ...state,
    preferences: {
      theme: 'system',
      notifications: true,
    },
  }),
};

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  version: 3,                               // ← Current version
  whitelist: ['auth', 'onboarding'],
  migrate: createMigrate(migrations, { debug: __DEV__ }),
};
```

### 30.3 — Rules

1. **Always increment `version`** when changing persisted slice shapes.
2. **Always provide a migration function** for each version bump.
3. **Never delete a migration** — old users may be on any version.
4. **Test migrations** by manually setting old state in AsyncStorage and verifying the upgrade.
5. **Keep migrations simple** — only transform data, never make API calls.
6. **Log migration results** in `__DEV__` to verify they ran correctly.

---

## Quick Reference Commands

```bash
# ─── Development ─────────────────────────────────────────────────────────────
yarn start                    # Start Metro bundler
yarn startC                   # Start with cache cleared
yarn android:dev              # Run on Android (dev)
yarn ios                      # Run on iOS
yarn ios:dev                  # Run on iOS (dev scheme)
yarn ios:staging              # Run on iOS (staging scheme)
yarn ios:prod                 # Run on iOS (production scheme)

# ─── Building ────────────────────────────────────────────────────────────────
yarn clean                    # Clean Android build
yarn pod                      # Install iOS pods
yarn apk                      # Generate release APK
yarn bundle                   # Generate release AAB
yarn build-ios                # Generate iOS bundle

# ─── Testing & Quality ──────────────────────────────────────────────────────
yarn test                     # Run Jest tests
yarn lint                     # Run ESLint
npx depcheck                  # Find unused dependencies
npx react-native-bundle-visualizer  # Analyze bundle size

# ─── Debugging ──────────────────────────────────────────────────────────────
adb logcat *:E                # Android error logs
xcrun simctl openurl booted "repcoach://home"  # Test deep links (iOS sim)
adb shell am start -a android.intent.action.VIEW -d "repcoach://home"  # Test deep links (Android)
```

---

> **This is a living document.** Update it as the project evolves. When adding a new pattern,
> library, or convention, document it here first so all contributors stay aligned.
>
> **Last updated:** April 2026 | **Sections:** 30 | **Applicable RN version:** 0.79.x
